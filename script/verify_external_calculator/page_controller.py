import re
from typing import Optional

from playwright.async_api import Page

from models import AttackerCondition, BattleCondition, DefenderCondition, EnvironmentCondition

POKESOL_URL = "https://sv.pokesol.com/calc"

# Rate limit delay in ms between interactions that trigger server requests
RATE_LIMIT_MS = 1000


class PageController:
    """Controls the pokesol damage calculator page via Playwright.

    Page structure (verified via screenshots):
    - LEFT side: Attacker section
      - Pokemon autocomplete, Move autocomplete
      - Attack/SpAtk stat: EV (努力値) input, IV input, nature toggles
      - Critical hit checkbox
      - Ability dropdown (特性), Item dropdown (もちもの)
      - Weather/Terrain dropdowns
      - Status checkboxes (burn, etc.)

    - RIGHT side: Defender section
      - Pokemon autocomplete
      - HP/Defense/SpDef: EV inputs, IV inputs, nature toggles
      - Ability dropdown (特性), Item dropdown (もちもの)
      - Weather/Terrain dropdowns, Walls checkboxes
    """

    def __init__(self, page: Page, data_loader=None):
        self.page = page
        self.data_loader = data_loader

    async def navigate(self):
        """Navigate to the pokesol calculator and wait for it to load."""
        await self.page.goto(POKESOL_URL)
        await self.page.wait_for_load_state("networkidle")
        await self.page.wait_for_timeout(RATE_LIMIT_MS)

    async def input_battle_condition(self, condition: BattleCondition):
        """Input all battle conditions into the calculator."""
        await self._set_attacker(condition.attacker)
        await self._set_defender(condition.defender)
        await self._set_environment(condition.environment)
        # Wait for result to update
        await self.page.wait_for_timeout(1000)

    # =============================================
    # Attacker section
    # =============================================

    async def _set_attacker(self, attacker: AttackerCondition):
        """Set all attacker-side conditions."""
        # 1. Pokemon selection
        await self._select_autocomplete_by_index(0, attacker.pokemon_name_jp, "Pokémon")
        await self.page.wait_for_timeout(500)

        # 2. Move selection
        await self._select_autocomplete_by_index(0, attacker.move_name_jp, "攻撃技")
        await self.page.wait_for_timeout(500)

        # 3. Attack stat EV and nature
        stat_label = await self._detect_attacker_stat_label()
        if stat_label:
            ev = attacker.ev.sp_atk if stat_label == "特攻" else attacker.ev.attack
            nature = attacker.nature.sp_atk if stat_label == "特攻" else attacker.nature.attack
            # Set EV using the slider (index 0 = attacker's)
            await self._set_ev_via_slider(0, ev)
            # Set nature using toggle buttons (first group = attacker's)
            await self._set_nature_toggle(0, nature)

        # 4. Critical hit
        if attacker.is_critical:
            await self._click_checkbox("急所")

        # 5. Ability (MUI Select) with verification
        if attacker.ability_name_jp:
            success = await self._set_mui_select_by_label_index("特性", 0, attacker.ability_name_jp)
            if success:
                await self._verify_select_against_data("特性", 0, attacker.ability_name_jp, "ability")

        # 6. Item (MUI Select) with verification
        if attacker.item_name_jp:
            success = await self._set_mui_select_by_label_index("もちもの", 0, attacker.item_name_jp)
            if success:
                await self._verify_select_against_data("もちもの", 0, attacker.item_name_jp, "item")

        # 7. Status ailment
        if attacker.status_ailment == "やけど":
            await self._click_checkbox("やけど")

    async def _detect_attacker_stat_label(self) -> Optional[str]:
        """Detect which stat section is shown for the attacker (攻撃 or 特攻)."""
        for label in ["特攻", "攻撃"]:
            locator = self.page.get_by_text(label, exact=True)
            if await locator.count() > 0 and await locator.first.is_visible():
                return label
        return "攻撃"

    # =============================================
    # Defender section
    # =============================================

    async def _set_defender(self, defender: DefenderCondition):
        """Set all defender-side conditions."""
        # 1. Pokemon selection (second Pokemon combobox)
        await self._select_autocomplete_by_index(1, defender.pokemon_name_jp, "Pokémon")
        await self.page.wait_for_timeout(500)

        # 2. HP EV (slider index 1)
        await self._set_ev_via_slider(1, defender.ev.hp)

        # 3. Defense EV and nature (slider index 2)
        await self._set_ev_via_slider(2, defender.ev.defense)
        await self._set_nature_toggle(1, defender.nature.defense)

        # 4. SpDef EV and nature (slider index 3)
        await self._set_ev_via_slider(3, defender.ev.sp_def)
        await self._set_nature_toggle(2, defender.nature.sp_def)

        # 5. Ability (second 特性 on page = defender's) with verification
        if defender.ability_name_jp:
            success = await self._set_mui_select_by_label_index("特性", 1, defender.ability_name_jp)
            if success:
                await self._verify_select_against_data("特性", 1, defender.ability_name_jp, "ability")

        # 6. Item (second もちもの on page = defender's) with verification
        if defender.item_name_jp:
            success = await self._set_mui_select_by_label_index("もちもの", 1, defender.item_name_jp)
            if success:
                await self._verify_select_against_data("もちもの", 1, defender.item_name_jp, "item")

    # =============================================
    # Environment section
    # =============================================

    async def _set_environment(self, env: EnvironmentCondition):
        """Set weather and terrain conditions (use attacker side = first instance)."""
        if env.weather:
            await self._set_mui_select_by_label_index("天候", 0, env.weather)
        if env.terrain:
            await self._set_mui_select_by_label_index("フィールド", 0, env.terrain)

    # =============================================
    # EV input interaction (using 努力値 text inputs)
    # =============================================

    @staticmethod
    def _ev_to_internal(ev: int) -> int:
        """Convert EV value (0-252) to slider internal value (0-32).

        The pokesol MUI Slider uses internal values 0-32:
        - Internal 0 → EV 0
        - Internal k (k>=1) → EV = k * 8 - 4
        """
        if ev <= 0:
            return 0
        if ev >= 252:
            return 32
        return (ev + 4) // 8

    @staticmethod
    def _internal_to_ev(internal: int) -> int:
        """Convert slider internal value (0-32) to EV value (0-252)."""
        if internal <= 0:
            return 0
        if internal >= 32:
            return 252
        return internal * 8 - 4

    async def _set_ev_via_slider(self, slider_index: int, ev_value: int):
        """Set EV value using the MUI Slider with verification.

        Uses position-based clicking for rough positioning, then explicitly
        focuses the slider input and fine-tunes with arrow keys.

        The pokesol MUI v5 slider uses internal values 0-32, where each
        arrow key press changes the internal value by 1 (= 8 EV points).

        Slider indices on the page:
        - Index 0: Attacker's attack/sp_atk EV
        - Index 1: Defender's HP EV
        - Index 2: Defender's Defense EV
        - Index 3: Defender's SpDef EV
        """
        slider_roots = self.page.locator("span.MuiSlider-root")
        root_count = await slider_roots.count()
        if slider_index >= root_count:
            print(f"  Warning: Slider index {slider_index} out of range ({root_count} sliders)")
            return

        root = slider_roots.nth(slider_index)
        await root.scroll_into_view_if_needed()

        # Locate the hidden input inside the slider (MUI v5 structure)
        input_el = root.locator("input[type='range']")
        if await input_el.count() == 0:
            print(f"  Warning: Slider input not found for index {slider_index}")
            return

        # Step 1: Click on the slider track at approximate position
        box = await root.bounding_box()
        if not box:
            print(f"  Warning: Could not get slider bounding box")
            return

        ratio = ev_value / 252 if ev_value > 0 else 0
        x = box["x"] + box["width"] * ratio
        y = box["y"] + box["height"] / 2
        await self.page.mouse.click(x, y)
        await self.page.wait_for_timeout(200)

        # Step 2: Explicitly focus the slider input for keyboard events
        await input_el.first.focus()
        await self.page.wait_for_timeout(100)

        # Step 3: Handle boundary values
        if ev_value == 0:
            await self.page.keyboard.press("Home")
            await self.page.wait_for_timeout(100)
            return
        elif ev_value >= 252:
            await self.page.keyboard.press("End")
            await self.page.wait_for_timeout(100)
            return

        # Step 4: Read actual internal value and fine-tune with arrow keys
        target_internal = self._ev_to_internal(ev_value)
        actual_str = await input_el.first.get_attribute("aria-valuenow")
        actual_internal = int(actual_str) if actual_str else 0
        diff = target_internal - actual_internal

        if diff != 0:
            key = "ArrowRight" if diff > 0 else "ArrowLeft"
            for _ in range(abs(diff)):
                await self.page.keyboard.press(key)
            await self.page.wait_for_timeout(100)

        # Step 5: Verify final value
        final_str = await input_el.first.get_attribute("aria-valuenow")
        final_internal = int(final_str) if final_str else 0
        final_ev = self._internal_to_ev(final_internal)
        if final_internal != target_internal:
            print(f"  Warning: EV slider {slider_index}: target={ev_value}, actual={final_ev} (internal: {final_internal}/{target_internal})")
        elif diff != 0:
            actual_ev = self._internal_to_ev(actual_internal)
            print(f"  EV slider {slider_index}: adjusted {actual_ev} -> {final_ev} (target={ev_value})")

    # =============================================
    # Nature toggle interaction
    # =============================================

    async def _set_nature_toggle(self, group_index: int, modifier: float):
        """Set nature modifier using toggle buttons.

        Nature toggle groups on page in order:
        - Index 0: Attacker's attack/sp_atk nature
        - Index 1: Defender's defense nature
        - Index 2: Defender's sp_def nature

        Each group has three buttons: x0.9, x1.0, x1.1
        """
        if modifier == 1.0:
            return  # Default, no change needed

        btn_text = self._nature_button_text(modifier)
        buttons = self.page.get_by_role("button", name=btn_text)
        count = await buttons.count()
        if group_index < count:
            btn = buttons.nth(group_index)
            await btn.scroll_into_view_if_needed()
            await btn.click()

    # =============================================
    # MUI Autocomplete interaction
    # =============================================

    async def _select_autocomplete_by_index(self, index: int, value: str, label: str):
        """Select a value from an MUI Autocomplete combobox."""
        comboboxes = self.page.get_by_role("combobox", name=label)
        combobox = comboboxes.nth(index)

        # Clear and type
        await combobox.click()
        await combobox.fill("")
        await combobox.fill(value)
        await self.page.wait_for_timeout(500)

        # Wait for autocomplete listbox
        listbox = self.page.get_by_role("listbox")
        try:
            await listbox.wait_for(state="visible", timeout=3000)
        except Exception:
            print(f"  Warning: Autocomplete listbox did not appear for '{value}'")
            await combobox.press("Escape")
            return

        # Find and click the matching option
        options = listbox.get_by_role("option")
        count = await options.count()
        for i in range(count):
            option = options.nth(i)
            text = await option.text_content()
            if text and value in text:
                await option.click()
                return

        # Fallback: click first option
        if count > 0:
            await options.first.click()
        else:
            await combobox.press("Escape")
            print(f"  Warning: No autocomplete option found for '{value}'")

    # =============================================
    # MUI Select interaction
    # =============================================

    async def _set_mui_select_by_label_index(self, label: str, index: int, value: str) -> bool:
        """Set a value in an MUI Select dropdown by label text and occurrence index.

        Uses MuiFormControl-root as the container to reliably find both the label
        and the combobox trigger within the same form control.

        Args:
            label: The label text (e.g., "特性", "もちもの", "天候", "フィールド")
            index: Which occurrence of this label (0=first/attacker, 1=second/defender)
            value: The value to select

        Returns:
            True if the value was successfully selected.
        """
        # Strategy 1: Find MuiFormControl containers with matching label
        # MUI Select trigger can be div[role='combobox'] or .MuiSelect-select
        form_controls = self.page.locator(".MuiFormControl-root")
        control_count = await form_controls.count()

        found_index = 0
        for i in range(control_count):
            control = form_controls.nth(i)
            if not await control.is_visible():
                continue

            # Check if this form control has a <label> matching our target
            label_in_control = control.locator("label")
            label_count = await label_in_control.count()
            label_matches = False
            for li in range(label_count):
                label_text = (await label_in_control.nth(li).text_content() or "").strip()
                if label_text == label:
                    label_matches = True
                    break
            if not label_matches:
                continue

            # Find the MUI Select trigger (NOT an input element)
            # MUI Select uses: div[role='combobox'] or .MuiSelect-select
            # MUI Autocomplete uses: input[role='combobox'] (excluded)
            trigger = control.locator(".MuiSelect-select")
            if await trigger.count() == 0:
                trigger = control.locator("div[role='combobox']")
            if await trigger.count() == 0:
                trigger = control.locator("[role='button']")
            if await trigger.count() == 0:
                continue

            if found_index != index:
                found_index += 1
                continue

            # Found the target select
            result = await self._click_select_and_choose(trigger.first, value)
            # Wait for dropdown animation to complete
            await self.page.wait_for_timeout(500)
            return result

        print(f"  Warning: MUI Select for '{label}' index {index} not found "
              f"(checked {control_count} form controls, {found_index} matched label)")
        return False

    async def _click_select_and_choose(self, trigger, value: str) -> bool:
        """Click an MUI Select trigger and choose a value from the popup.

        Returns:
            True if a matching option was found and clicked.
        """
        # Ensure any previously open popup is closed
        await self.page.keyboard.press("Escape")
        await self.page.wait_for_timeout(300)
        # Click on body to dismiss any modal backdrops
        await self.page.locator("body").click(position={"x": 1, "y": 1}, force=True)
        await self.page.wait_for_timeout(300)

        await trigger.scroll_into_view_if_needed()
        await trigger.click(force=True)
        await self.page.wait_for_timeout(500)

        # Wait for listbox popup
        listbox = self.page.get_by_role("listbox")
        try:
            await listbox.wait_for(state="visible", timeout=3000)
        except Exception:
            # Retry: click again in case the first click was absorbed
            await trigger.click(force=True)
            await self.page.wait_for_timeout(500)
            try:
                await listbox.wait_for(state="visible", timeout=3000)
            except Exception:
                print(f"  Warning: Select listbox did not appear after retry")
                await self.page.keyboard.press("Escape")
                return False

        # Find and click the matching option
        options = listbox.get_by_role("option")
        count = await options.count()

        # Strategy A: Use Playwright's built-in name matching (handles ARIA)
        named_option = listbox.get_by_role("option", name=value, exact=True)
        if await named_option.count() > 0:
            await named_option.first.click()
            return True

        # Strategy B: Iterate and match with text_content()
        for j in range(count):
            opt = options.nth(j)
            opt_text = (await opt.text_content() or "").strip()
            if opt_text == value:
                await opt.click()
                return True

        # Strategy C: Substring match
        for j in range(count):
            opt = options.nth(j)
            opt_text = (await opt.text_content() or "").strip()
            if value in opt_text:
                await opt.click()
                return True

        # No match found - try to select "なし" (none) as fallback
        nashi_option = listbox.get_by_role("option", name="なし", exact=True)
        if await nashi_option.count() > 0:
            await nashi_option.first.click()
            print(f"  Warning: Option '{value}' not found in dropdown ({count} options), selected 'なし'")
            return False

        print(f"  Warning: Option '{value}' not found in dropdown ({count} options)")
        await self.page.keyboard.press("Escape")
        return False

    async def _read_select_value(self, label: str, index: int) -> Optional[str]:
        """Read the currently selected value text from an MUI Select.

        Returns:
            The selected value text, or None if the select was not found.
        """
        form_controls = self.page.locator(".MuiFormControl-root")
        control_count = await form_controls.count()

        found_index = 0
        for i in range(control_count):
            control = form_controls.nth(i)
            if not await control.is_visible():
                continue

            label_in_control = control.locator("label")
            label_count = await label_in_control.count()
            label_matches = False
            for li in range(label_count):
                label_text = (await label_in_control.nth(li).text_content() or "").strip()
                if label_text == label:
                    label_matches = True
                    break
            if not label_matches:
                continue

            trigger = control.locator(".MuiSelect-select")
            if await trigger.count() == 0:
                trigger = control.locator("div[role='combobox']")
            if await trigger.count() == 0:
                continue

            if found_index != index:
                found_index += 1
                continue

            text = (await trigger.first.text_content() or "").strip()
            # MUI Select may show the label text as placeholder when no value selected
            if text == label or text == "":
                return None
            return text

        return None

    async def _verify_select_against_data(
        self, label: str, index: int, expected: str, data_type: str
    ):
        """Verify that the selected dropdown value matches expected value using data files.

        Args:
            label: The select label ("特性" or "もちもの")
            index: Which occurrence (0=attacker, 1=defender)
            expected: The expected Japanese name
            data_type: "ability" or "item" for data lookup
        """
        selected = await self._read_select_value(label, index)
        if selected is None:
            print(f"  Warning: {label} (index {index}) has no value selected, expected '{expected}'")
            return

        if selected == expected:
            return  # Exact match, all good

        # Mismatch: verify selected value exists in data files
        if self.data_loader:
            if data_type == "ability":
                record = self.data_loader.get_ability_by_name_jp(selected)
            else:
                record = self.data_loader.get_item_by_name_jp(selected)

            if record:
                print(f"  Warning: {label} selected '{selected}' instead of '{expected}' (valid in data)")
            else:
                print(f"  Warning: {label} selected '{selected}' not found in data, expected '{expected}'")
        else:
            print(f"  Warning: {label} selected '{selected}' instead of '{expected}'")

    # =============================================
    # Checkbox interaction
    # =============================================

    async def _click_checkbox(self, label: str):
        """Toggle a checkbox by its label text."""
        checkbox = self.page.get_by_role("checkbox", name=label)
        if await checkbox.count() > 0 and await checkbox.first.is_visible():
            await checkbox.first.click()

    # =============================================
    # Result extraction
    # =============================================

    async def get_result(self) -> str:
        """Extract the damage calculation result text from the page.

        Result format: "93 ~ 109 (60.0 ~ 70.4%) 確定2発"
        Sometimes with probability suffix: " : 6.25%"
        """
        # Wait for any element containing the result pattern
        result_pattern = re.compile(r"\d+\s*~\s*\d+\s*\(\d+\.?\d*\s*~\s*\d+\.?\d*%\)")
        result_locator = self.page.locator("p, div, span").filter(has_text=result_pattern)

        await result_locator.first.wait_for(state="visible", timeout=5000)
        text = await result_locator.first.text_content()

        if not text:
            raise RuntimeError("Could not extract result text from the page")

        # Extract the core result using a precise regex
        # Matches: "198 ~ 234 (121.5 ~ 143.6%) 確定1発" or "乱数2発 : 75%"
        match = re.search(
            r"(\d+\s*~\s*\d+\s*\(\d+\.?\d*\s*~\s*\d+\.?\d*%\)\s*"
            r"(?:確定\d+発|乱数\d+発|確定耐え|--)(?:\s*:\s*\d+\.?\d*%)?)",
            text,
        )
        if match:
            return match.group(1).strip()

        # Fallback: match just the damage numbers (e.g., "0 ~ 0 (0.0 ~ 0.0%)")
        fallback = re.search(
            r"(\d+\s*~\s*\d+\s*\(\d+\.?\d*\s*~\s*\d+\.?\d*%\))",
            text,
        )
        if fallback:
            return fallback.group(1).strip()

        raise RuntimeError(f"Could not parse result: {text[:200]}")

    async def take_screenshot(self, path: str):
        """Take a full-page screenshot."""
        await self.page.screenshot(path=path, full_page=True)

    # =============================================
    # Helper methods
    # =============================================

    @staticmethod
    def _nature_button_text(modifier: float) -> str:
        """Convert a nature modifier value to the button text format."""
        if modifier == 0.9:
            return "x0.9"
        elif modifier == 1.1:
            return "x1.1"
        return "x1.0"
