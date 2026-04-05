# Skill: Update Test Cases from External Calculator Results

## Invocation

`/update-test-cases`

## Description

Reads external calculator verification results from `frontend/scripts/verify-external-calculator/external-results/results.json`, maps Japanese names to internal IDs, runs our calculator to get actual `DamageResult` values, compares with external results, and generates new integration test cases for `frontend/models/calculation-resources.test.ts`.

## Steps

### Step 1: Read External Results

Read `frontend/scripts/verify-external-calculator/external-results/results.json`. Each entry has:

```json
{
  "battle_condition": {
    "attacker": {
      "pokemon_name_jp": "ドラパルト",
      "move_name_jp": "りゅうせいぐん",
      "level": 50,
      "ev": { "hp": 0, "attack": 0, "defense": 0, "sp_atk": 252, "sp_def": 0, "speed": 252 },
      "iv": { "hp": 31, "attack": 31, "defense": 31, "sp_atk": 31, "sp_def": 31, "speed": 31 },
      "nature": { "attack": 0.9, "defense": 1.0, "sp_atk": 1.1, "sp_def": 1.0, "speed": 1.0 },
      "ability_name_jp": null,
      "item_name_jp": null,
      "stats_rank": { "attack": 0, "defense": 0, "sp_atk": 0, "sp_def": 0, "speed": 0 },
      "is_critical": false,
      "status_ailment": null,
      "tera_type": null
    },
    "defender": {
      "pokemon_name_jp": "サーフゴー",
      "level": 50,
      "ev": { "hp": 252, "attack": 0, "defense": 0, "sp_atk": 0, "sp_def": 0, "speed": 0 },
      "iv": { "hp": 31, "attack": 31, "defense": 31, "sp_atk": 31, "sp_def": 31, "speed": 31 },
      "nature": { "attack": 1.0, "defense": 1.0, "sp_atk": 1.0, "sp_def": 1.0, "speed": 1.0 },
      "ability_name_jp": null,
      "item_name_jp": null,
      "stats_rank": { "attack": 0, "defense": 0, "sp_atk": 0, "sp_def": 0, "speed": 0 },
      "status_ailment": null
    },
    "environment": {
      "weather": null,
      "terrain": null
    }
  },
  "external_result": {
    "min_damage": 55,
    "max_damage": 66,
    "min_damage_ratio": 28.4,
    "max_damage_ratio": 34.0,
    "ko_text": "乱数3発 : 1.07%",
    "raw_text": "55 ~ 66 (28.4 ~ 34.0%) 乱数3発 : 1.07%"
  },
  "screenshot_path": "screenshots/case_0000_20260328_105837.png",
  "timestamp": "20260328_105837"
}
```

### Step 2: Map Japanese Names to Internal IDs

Use the JSON data files in `frontend/data/` to map names to IDs:

- **Pokemon**: `frontend/data/pokemon_data_sv.json` - look up `name_jp` to get `id`
- **Move**: `frontend/data/move_data_sv.json` - look up `name_jp` to get `id`
- **Ability**: `frontend/data/ability_data_sv.json` - look up `name_jp` to get `id`
- **Item**: `frontend/data/item_data_sv.json` - look up `name_jp` to get `id`

For null values:
- `ability_name_jp: null` -> use `new Ability(0)` (no ability)
- `item_name_jp: null` -> use `new Item(0)` (no item)
- `status_ailment: null` -> use `new StatusAilment(0)` (no status)
- `tera_type: null` -> use `new TeraType(0, false)` (no tera)

### Step 3: Check for Duplicates

Search `frontend/models/calculation-resources.test.ts` for existing test names matching the pattern:
```
"{攻撃ポケモンname_jp} ->（{技name_jp}）-> {防御ポケモンname_jp}"
```

Skip any test case that already exists.

### Step 4: Generate Test Code

For each non-duplicate test case, generate code following this exact pattern:

```typescript
test("{attacker_pokemon_jp} ->（{move_jp}）-> {defender_pokemon_jp}", () => {
  const calculationResources = new CalculationResources(
    new AttackingPokemonStatus(
      new Pokemon({attacker_pokemon_id}),  // {attacker_pokemon_jp}
      {level},
      new IV({iv.hp}, {iv.attack}, {iv.defense}, {iv.sp_atk}, {iv.sp_def}, {iv.speed}),
      new EV({ev.hp}, {ev.attack}, {ev.defense}, {ev.sp_atk}, {ev.sp_def}, {ev.speed}),
      new Nature({nature.attack}, {nature.defense}, {nature.sp_atk}, {nature.sp_def}, {nature.speed}),
      new StatsRank({stats_rank.attack}, {stats_rank.defense}, {stats_rank.sp_atk}, {stats_rank.sp_def}, {stats_rank.speed}),
      new Move({move_id}),  // {move_jp}
      new TeraType({tera_type_id}, {tera_active}),
      new Ability({ability_id}),
      new Item({item_id}),
      {is_critical},
      new StatusAilment({status_ailment_id})
    ),
    new DefendingPokemonStatus(
      new Pokemon({defender_pokemon_id}),  // {defender_pokemon_jp}
      {level},
      new IV({iv.hp}, {iv.attack}, {iv.defense}, {iv.sp_atk}, {iv.sp_def}, {iv.speed}),
      new EV({ev.hp}, {ev.attack}, {ev.defense}, {ev.sp_atk}, {ev.sp_def}, {ev.speed}),
      new Nature({nature.attack}, {nature.defense}, {nature.sp_atk}, {nature.sp_def}, {nature.speed}),
      new StatsRank({stats_rank.attack}, {stats_rank.defense}, {stats_rank.sp_atk}, {stats_rank.sp_def}, {stats_rank.speed}),
      new TeraType(0, false),
      new Ability({ability_id}),
      new Item({item_id}),
      new StatusAilment({status_ailment_id})
    ),
    new EnvironmentStatus(new Weather({weather_id}), new Terrain({terrain_id}))
  );

  const result = calculationResources.calculateDamage();
  // External calculator: {external_result.raw_text}
  const expected = new DamageResult({minDamage}, {maxDamage}, {minDamageRatio}, {maxDamageRatio}, {minKakutei}, {maxKakutei});
  expect(result).toEqual(expected);
});
```

**Comment variations based on mismatch classification (see Step 6):**

```typescript
// Category A (Exact match):
// External calculator: 55 ~ 66 (28.4 ~ 34.0%)

// Category B (Nature rounding ±1):
// External calculator: 57 ~ 68 (1 off, pokesol nature rounding differs)

// Category C (pokesol bug):
// External calculator: 65 ~ 77 (pokesol shows Hex with doubled power, our calc uses base power 65)
// External calculator: 6 ~ 8 (pokesol applies Deep Sea Scale to non-Clamperl, our calc correctly ignores it)
// External calculator: 30 ~ 35 per hit (pokesol shows 5-hit total 150 ~ 175 for multi-hit move)
```

### Step 5: Get Actual DamageResult Values

For each test case, **temporarily add `console.log(result)` and run the test** to get the actual DamageResult values from our calculator:

```bash
cd frontend && npx jest calculation-resources.test.ts -t "{test_name}" --no-coverage
```

Use the actual values from our calculator (not the external calculator) as the `expected` DamageResult.

### Step 6: Compare and Classify Results

For each test case, compare our calculator's result with the external calculator's result and classify the outcome into one of the categories below.

**Expected tolerance:**
- `minDamage` / `maxDamage`: exact match preferred
- `minDamageRatio` / `maxDamageRatio`: within 0.1% tolerance

**Mismatch classification (determine cause before reporting):**

| Category | Symptom | Action |
|----------|---------|--------|
| A. Exact match | values align | Add test case, no special comment |
| B. Nature rounding (±1) | 1-point off on boundary stats | Add test case with our values, comment `// External calculator: X~Y (1 off, pokesol nature rounding differs)`. Our `Math.floor` is correct per official wiki. |
| C. Known pokesol bug | matches a documented pattern below | Add test case with our values, comment identifying the pokesol bug |
| D. Unknown / real bug | ≥2 point diff, or 1 point with no clear cause | **Stop and investigate before updating tests.** Our calculator may have a real bug. |

**Known pokesol bug patterns** (our calculator is correct, pokesol is wrong):

1. **Hex (たたりめ) doubled power** — pokesol defaults to displaying Hex with doubled power (130) as if the target is always statused. Our calc uses base power 65 unless `StatusAilment != 0` is set on the defender.
2. **Species-restricted items applied universally** — pokesol applies items like:
   - しんかいのウロコ (Deep Sea Scale) to all Pokemon instead of only Clamperl
   - しんかいのキバ (Deep Sea Tooth) to all Pokemon instead of only Clamperl
   - でんきだま (Light Ball) to all Pokemon instead of only Pikachu
   - ふといホネ (Thick Club) to all Pokemon instead of only Cubone/Marowak
   Our calc correctly gates these on the holder's species.
3. **Multi-hit moves** — For moves like タネマシンガン (Bullet Seed), pokesol may display the total damage across all hits, while our calc shows per-hit damage. This is a display convention difference, not a bug.

**Nature rounding differences (±1 point):**
Our stat calculation uses `Math.floor` for the nature multiplier step, matching the official ポケモンWiki's "小数点以下は計算のたびに切り捨て" rule. pokesol may use a slightly different rounding strategy on certain stat values, causing 1-point differences at boundaries like `floor(163 * 0.9) = 146` vs `147`. Do not "fix" this — our implementation is authoritative.

**If Category D (Unknown):**
- Do **not** blindly add the test with our calc's values.
- Report the mismatch to the user with full context (battle condition, both results, suspected cause).
- Wait for user guidance before proceeding.

### Step 7: Insert Tests

Add the new tests inside a `describe("External calculator verification", () => { ... })` block.

**If the block already exists**: Append new tests inside it.
**If it does not exist**: Create a new describe block at the end of the root `describe` block, before the final closing `});`.

Find the insertion point by searching for the last `});` in the file (the closing of the root `describe("CalculationResources#calculateDamage"` block).

### Step 8: Verify

1. Run the new tests: `cd frontend && npx jest calculation-resources.test.ts --no-coverage`
2. Run lint: `cd frontend && npm run lint`
3. If there are test failures, investigate and fix

## Important Notes

### Nature Parameter Order
Nature constructor takes 5 parameters: `(attack, defense, spAtk, spDef, speed)` - NO HP parameter.

### EV/IV Parameter Order
EV and IV constructors take 6 parameters: `(hp, attack, defense, spAtk, spDef, speed)`.

### StatsRank Parameter Order
StatsRank constructor takes 5 parameters: `(attack, defense, spAtk, spDef, speed)` - NO HP parameter.

### Weather/Terrain Mapping
| Value | Weather | Terrain |
|-------|---------|---------|
| null/0 | None | None |
| 1 | Sunny (にほんばれ) | Electric Terrain (エレキフィールド) |
| 2 | Rain (あめ) | Grassy Terrain (グラスフィールド) |
| 3 | Sandstorm (すなあらし) | Misty Terrain (ミストフィールド) |
| 4 | Snow (ゆき) | Psychic Terrain (サイコフィールド) |

### Status Ailment Mapping
| Value | Status |
|-------|--------|
| null/0 | None |
| 1 | Paralysis (まひ) |
| 2 | Sleep (ねむり) |
| 3 | Frozen (こおり) |
| 4 | Burn (やけど) |
| 5 | Poison (どく) |

### Screenshot Verification
Optionally read screenshots from `frontend/scripts/verify-external-calculator/external-results/{screenshot_path}` to visually verify the battle conditions were set correctly on the external calculator.

### Testing Guidelines
Follow the project's testing guidelines:
- **ALWAYS** use concrete `DamageResult` values (never `toBeGreaterThan()` etc.)
- Use our calculator's actual output as the expected value
- Add a comment with the external calculator's raw text for reference

### Gen 5+ Damage Formula Modifier Order (CRITICAL)

When investigating mismatches, verify against the official reference: https://wiki.xn--rckteqa2e.com/wiki/ダメージ

Modifier application order (第五世代以降):
```
基本ダメージ
  × 天気補正 × 急所 × 乱数 × タイプ一致 × タイプ相性
  × やけど                           ← Burn reduction (2048/4096)
  × M_damage (Item damage modifiers) ← Life Orb, Expert Belt, Damage-Reducing Berries
  × Ability damage modifiers         ← Filter, Multiscale, etc.
```

**IMPORTANT:** Burn reduction is applied **BEFORE** item damage modifiers, not after.

If you see unexpected ±1~2 point mismatches on burned attackers, suspect modifier order regressions first.
