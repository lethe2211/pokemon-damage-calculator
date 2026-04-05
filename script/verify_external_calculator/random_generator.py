import random
from typing import Optional

from data_loader import DataLoader
from models import (
    AttackerCondition,
    BattleCondition,
    DefenderCondition,
    EnvironmentCondition,
    NatureModifiers,
    StatValues,
    StatsRank,
)

# Weather names recognized by the external calculator
WEATHERS = [None, "にほんばれ", "あめ", "すなあらし", "ゆき"]

# Terrain names recognized by the external calculator
TERRAINS = [None, "エレキフィールド", "グラスフィールド", "ミストフィールド", "サイコフィールド"]

# Valid EV values on the pokesol slider (values that change the stat at Lv50)
# Pattern: 0, then 4 + 8k for k=0..31 → {0, 4, 12, 20, 28, ..., 244, 252}
VALID_SLIDER_EVS = [0] + [4 + 8 * k for k in range(32)]

# Status ailments (only burn affects damage calculation directly)
STATUS_AILMENTS = [None, "やけど"]


class RandomBattleGenerator:
    """Generates random battle conditions from available Pokemon data."""

    def __init__(self, data_loader: DataLoader):
        self.data = data_loader

    def generate(self, count: int = 1) -> list[BattleCondition]:
        """Generate the specified number of random battle conditions."""
        conditions = []
        for _ in range(count):
            conditions.append(self._generate_one())
        return conditions

    def _generate_one(self) -> BattleCondition:
        attacker_pokemon, move = self._random_pokemon_with_move()
        defender_pokemon = self._random_sv_pokemon()

        attacker_ability = self._random_ability(attacker_pokemon["id"])
        defender_ability = self._random_ability(defender_pokemon["id"])

        # Determine whether to use items (50% chance)
        attacker_item = None
        if random.random() < 0.5:
            items = self.data.get_valid_attacker_items()
            # Exclude "No items" (id=0) when selecting a random item
            valid_items = [i for i in items if i["id"] != 0]
            if valid_items:
                attacker_item = random.choice(valid_items)["name_jp"]

        defender_item = None
        if random.random() < 0.5:
            items = self.data.get_valid_defender_items()
            valid_items = [i for i in items if i["id"] != 0]
            if valid_items:
                defender_item = random.choice(valid_items)["name_jp"]

        # Weather and terrain (20% chance each)
        weather = random.choice(WEATHERS) if random.random() < 0.2 else None
        terrain = random.choice(TERRAINS) if random.random() < 0.2 else None

        # Status ailment for attacker (10% chance of burn)
        attacker_status = "やけど" if random.random() < 0.1 else None

        # Critical hit (10% chance)
        is_critical = random.random() < 0.1

        attacker = AttackerCondition(
            pokemon_name_jp=attacker_pokemon["name_jp"],
            move_name_jp=move["name_jp"],
            level=50,
            ev=self._random_ev(),
            iv=StatValues(31, 31, 31, 31, 31, 31),
            nature=self._random_nature(),
            ability_name_jp=attacker_ability,
            item_name_jp=attacker_item,
            stats_rank=StatsRank(),
            is_critical=is_critical,
            status_ailment=attacker_status,
            tera_type=None,
        )

        defender = DefenderCondition(
            pokemon_name_jp=defender_pokemon["name_jp"],
            level=50,
            ev=self._random_ev(),
            iv=StatValues(31, 31, 31, 31, 31, 31),
            nature=self._random_nature(),
            ability_name_jp=defender_ability,
            item_name_jp=defender_item,
            stats_rank=StatsRank(),
            status_ailment=None,
        )

        environment = EnvironmentCondition(weather=weather, terrain=terrain)

        return BattleCondition(attacker=attacker, defender=defender, environment=environment)

    def _random_sv_pokemon(self) -> dict:
        """Pick a random SV Pokemon without regional form suffix.

        Pokemon with form names in parentheses (e.g. ライチュウ（アローラのすがた）)
        are excluded because the pokesol autocomplete cannot match them.
        """
        sv_pokemon = [p for p in self.data.get_sv_pokemon() if "（" not in p["name_jp"]]
        return random.choice(sv_pokemon)

    def _random_pokemon_with_move(self) -> tuple[dict, dict]:
        """Pick a random SV Pokemon and a random damage move it can learn."""
        sv_pokemon = [p for p in self.data.get_sv_pokemon() if "（" not in p["name_jp"]]
        for _ in range(100):
            pokemon = random.choice(sv_pokemon)
            moves = self.data.get_learnable_damage_moves(pokemon["id"])
            if moves:
                return pokemon, random.choice(moves)
        raise RuntimeError("Could not find a Pokemon with learnable damage moves after 100 attempts")

    def _random_ev(self) -> StatValues:
        """Generate valid random EVs using pokesol slider-valid values.

        The pokesol calculator slider only allows EV values that change the
        actual stat at Lv50: 0, 4, 12, 20, 28, ..., 244, 252.
        Total EVs must not exceed 508.
        """
        stats = ["hp", "attack", "defense", "sp_atk", "sp_def", "speed"]
        evs = {s: 0 for s in stats}
        remaining = 508

        for stat in random.sample(stats, len(stats)):
            max_for_stat = min(252, remaining)
            if max_for_stat <= 0:
                continue
            valid = [v for v in VALID_SLIDER_EVS if v <= max_for_stat]
            val = random.choice(valid)
            evs[stat] = val
            remaining -= val

        return StatValues(**evs)

    def _random_nature(self) -> NatureModifiers:
        """Generate a random nature modifier.

        20% chance of neutral nature, 80% chance of one stat up and one stat down.
        """
        if random.random() < 0.2:
            return NatureModifiers()

        stats = ["attack", "defense", "sp_atk", "sp_def", "speed"]
        up, down = random.sample(stats, 2)
        mods = {s: 1.0 for s in stats}
        mods[up] = 1.1
        mods[down] = 0.9
        return NatureModifiers(**mods)

    def _random_ability(self, pokemon_id: int) -> Optional[str]:
        """Pick a random ability that the Pokemon can have."""
        abilities = self.data.get_pokemon_abilities(pokemon_id)
        if not abilities:
            return None
        return random.choice(abilities)["name_jp"]
