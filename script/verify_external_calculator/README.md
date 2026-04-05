# External Calculator Verification Script

Automates verification of damage calculation results against the reference calculator at https://sv.pokesol.com/calc using Playwright.

## Setup

```bash
cd script/verify_external_calculator
pip install -r requirements.txt
playwright install chromium
```

## Usage

### JSON File Input Mode

Provide a JSON file with battle conditions:

```bash
python3 script/verify_external_calculator/main.py --input script/verify_external_calculator/fixtures/sample_cases.json
```

Or via npm:

```bash
cd frontend
npm run verify:fetch -- ../script/verify_external_calculator/fixtures/sample_cases.json
```

### Random Mode

Generate and verify N random battle conditions:

```bash
python3 script/verify_external_calculator/main.py --random 5
```

Or via npm:

```bash
cd frontend
npm run verify:random -- 5
```

### Options

| Flag | Description |
|------|-------------|
| `--input PATH` | Path to JSON file with battle conditions |
| `--random N` | Generate N random battle conditions |
| `--output-dir PATH` | Output directory (default: `frontend/scripts/verify-external-calculator/external-results`) |
| `--headed` | Run browser in visible mode for debugging |

## Input JSON Format

See [fixtures/sample_cases.json](fixtures/sample_cases.json) for examples.

Each battle condition specifies:

- **attacker**: Pokemon, move, level, EVs, IVs, nature, ability, item, stats rank, critical hit, status ailment, tera type
- **defender**: Pokemon, level, EVs, IVs, nature, ability, item, stats rank, status ailment
- **environment**: Weather, terrain

## Output

Results are saved to the output directory:

- `screenshots/` - PNG screenshots for each test case
- `results.json` - Structured metadata with battle conditions and external calculator results

## Rate Limiting

The script enforces a 1-second delay between page navigations to avoid excessive load on the external server.

## Generating Test Cases

After running this script, use the `/update-test-cases` Claude Code skill to generate integration test cases from the results:

```
/update-test-cases
```

## Interpreting Mismatches

Not every difference between our calculator and pokesol is a bug in our code. Before changing any implementation based on a mismatch, classify it:

### Known pokesol bugs (our calc is correct)

| Pattern | Description |
|---------|-------------|
| **Hex (たたりめ) doubled** | pokesol defaults to displaying with doubled power (130), assuming target is always statused |
| **Deep Sea Scale (しんかいのウロコ)** | pokesol applies it to all Pokemon; it should only affect Clamperl |
| **Deep Sea Tooth (しんかいのキバ)** | Same as above — Clamperl-only |
| **Light Ball (でんきだま)** | pokesol may apply to all Pokemon; it should only affect Pikachu |
| **Thick Club (ふといホネ)** | pokesol may apply to all Pokemon; it should only affect Cubone/Marowak |
| **Multi-hit moves** | pokesol may show total damage across hits (e.g. タネマシンガン 5 hits summed), our calc shows per-hit |

### Expected ±1 point differences (our calc is correct)

Our stat calculation uses `Math.floor` for the nature multiplier step (per the official ポケモンWiki rule: "小数点以下は計算のたびに切り捨て"). pokesol may use a different rounding strategy at certain stat boundaries, producing 1-point damage differences. This is **not** a bug to fix — our implementation is authoritative.

### Real investigation needed

If you see:
- Any ≥2 point damage difference, or
- A 1-point difference with no matching pattern above

…stop and investigate. Check:
1. Gen 5+ modifier application order (https://wiki.xn--rckteqa2e.com/wiki/ダメージ)
2. Modifier timing (POWER vs DAMAGE; BEFORE_STAB vs AFTER_STAB)
3. Specific ability/item implementation correctness

**Reference**: Burn reduction must be applied **BEFORE** item damage modifiers like Life Orb, not after.
