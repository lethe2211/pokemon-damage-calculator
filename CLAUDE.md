# Pokemon Damage Calculator

## Language Policy

All code, commit messages, and documentation in this project MUST be written in English.

## Project Overview

A Next.js PWA for calculating Pokemon damage in Scarlet/Violet.

## Development

- Frontend: `cd frontend && npm run dev`
- Docker: `docker compose up --build`
- Tests: `cd frontend && npm test`
- Lint: `cd frontend && npm run lint`

## Quality Assurance

Before marking any implementation as complete, you MUST verify the following:

1. **Lint Check**: Run `cd frontend && npm run lint` and ensure it passes with no errors or warnings
2. **Unit Tests**: Run `cd frontend && npm run test:ci` and ensure all tests pass

Never report completion without confirming both checks pass successfully.

## Testing Guidelines

**CRITICAL**: When writing integration tests for `calculation-resources.test.ts`, always use **concrete expected DamageResult values** instead of weak assertions like `toBeGreaterThan()`.

### ❌ Bad Pattern (Weak Assertions)
```typescript
const result = calculationResources.calculateDamage();
expect(result.minDamage).toBeGreaterThan(0);
expect(result.maxDamage).toBeGreaterThan(result.minDamage);
```

### ✅ Good Pattern (Concrete Values)
```typescript
const result = calculationResources.calculateDamage();

// Life Orb: 1.3x power boost
// Electric is super effective vs Water/Flying (4x)
const expected = new DamageResult(168, 196, 98.2, 114.6, 1, 2);
expect(result).toEqual(expected);
```

### How to Get Expected Values

1. Add temporary `console.log(result)` in the test
2. Run the test: `npx jest calculation-resources.test.ts -t "test name" --no-coverage`
3. Extract actual values from console output
4. Create expected DamageResult with those values
5. Remove console.log

**Benefits**: Regression detection, clear expectations, easier debugging.

See `~/.claude/projects/[project]/memory/TESTING_GUIDELINES.md` for detailed examples.

## Code Comment Guidelines

**CRITICAL**: Comments must ALWAYS reflect the actual code. Inconsistent comments lead to confusion and bugs.

### ❌ Bad Pattern (Comment-Code Mismatch)
```typescript
new Pokemon(380), // Latios
// Comment says "Latios" but ID 380 is actually Latias
```

### ✅ Good Pattern (Comment-Code Match)
```typescript
new Pokemon(381), // Latios (ID 381, SpAtk: 130)
// Comment accurately reflects the code
```

### Rules

1. **Verify Comments Match Code**: When writing or modifying code with comments, always verify the comment reflects the actual implementation
2. **Update Comments with Code**: When changing code (e.g., IDs, values, logic), update related comments immediately
3. **Be Specific**: For Pokemon/Move/Item IDs, include the actual ID and key stats in comments when helpful
4. **Remove Outdated Comments**: Delete comments that no longer apply rather than leaving misleading information

**Example from Real Issue**: A test had `new Pokemon(380)` with comment `// Latios`, but ID 380 is Latias (SpAtk 110), not Latios (SpAtk 130, ID 381). This caused a test failure because the comment misled about which Pokemon was being tested.

## Architecture

- `frontend/models/calculation-resources.ts` - Core damage calculation engine
- `frontend/models/` - Domain models (pokemon, move, type, stats, etc.)
- `frontend/components/` - React UI components
- `frontend/data/` - Static JSON data files (from PokeAPI)
- `script/extract_data/` - Python scripts for data extraction

## Damage Calculation Reference

**CRITICAL**: All damage calculation logic MUST follow the Generation 5+ (第五世代以降) formula from:

**Official Reference**: https://wiki.xn--rckteqa2e.com/wiki/ダメージ

Key points:
- Use the "第五世代以降" (Generation 5 and later) calculation formula
- Follow the exact modifier application order specified in the wiki
- Use precise multipliers (e.g., Life Orb = 5324/4096, not 5325/4096)
- Apply modifiers at the correct timing (POWER vs DAMAGE modifiers)
- Always verify calculations against the wiki when implementing new features

This reference is authoritative for:
- Base damage formula
- Modifier application order
- STAB calculation
- Type effectiveness timing
- Weather/Terrain effects
- Item and Ability effect timing

## Pokemon Nature (性格補正)

**Reference**: https://yakkun.com/data/seikaku.htm

**CRITICAL**: Nature modifiers MUST be applied correctly to stat calculations.

### Nature Modifier Rules

1. **Modifier Values**:
   - **Increased stat (上昇)**: 1.1× (exactly 11/10)
   - **Decreased stat (下降)**: 0.9× (exactly 9/10)
   - **Neutral stat**: 1.0×

2. **Affected Stats**:
   - Attack (こうげき)
   - Defense (ぼうぎょ)
   - Special Attack (とくこう)
   - Special Defense (とくぼう)
   - Speed (すばやさ)
   - **HP is NEVER affected by nature**

3. **Nature Types**:
   - **20 natures with modifiers**: One stat ×1.1, one different stat ×0.9
   - **5 neutral natures**: No stat changes (がんばりや/Hardy, すなお/Docile, きまぐれ/Quirky, てれや/Bashful, まじめ/Serious)

### Implementation in Code

The `Nature` class has **5 parameters** (NO HP parameter):

```typescript
class Nature {
  attack: number;    // こうげき補正 (1.0, 1.1, or 0.9)
  defense: number;   // ぼうぎょ補正 (1.0, 1.1, or 0.9)
  spAtk: number;     // とくこう補正 (1.0, 1.1, or 0.9)
  spDef: number;     // とくぼう補正 (1.0, 1.1, or 0.9)
  speed: number;     // すばやさ補正 (1.0, 1.1, or 0.9)
}
```

### Common Nature Examples

- **Adamant (いじっぱり)**: Attack↑ (1.1), Sp.Atk↓ (0.9) → `new Nature(1.1, 1.0, 0.9, 1.0, 1.0)`
- **Modest (ひかえめ)**: Sp.Atk↑ (1.1), Attack↓ (0.9) → `new Nature(0.9, 1.0, 1.1, 1.0, 1.0)`
- **Jolly (ようき)**: Speed↑ (1.1), Sp.Atk↓ (0.9) → `new Nature(1.0, 1.0, 0.9, 1.0, 1.1)`
- **Timid (おくびょう)**: Speed↑ (1.1), Attack↓ (0.9) → `new Nature(0.9, 1.0, 1.0, 1.0, 1.1)`
- **Bold (ずぶとい)**: Defense↑ (1.1), Attack↓ (0.9) → `new Nature(0.9, 1.1, 1.0, 1.0, 1.0)`
- **Calm (おだやか)**: Sp.Def↑ (1.1), Attack↓ (0.9) → `new Nature(0.9, 1.0, 1.0, 1.1, 1.0)`
- **Hardy/Docile/Quirky/Bashful/Serious**: No modifiers → `new Nature(1.0, 1.0, 1.0, 1.0, 1.0)`

### ❌ Common Mistakes to Avoid

**WRONG Parameter Order**:
```typescript
// Bold nature (Defense↑ Attack↓) - INCORRECT
new Nature(1.0, 0.9, 1.1, 1.0, 1.0)  // Wrong! This is Attack=1.0, Defense=0.9
```

**CORRECT Parameter Order**:
```typescript
// Bold nature (Defense↑ Attack↓) - CORRECT
new Nature(0.9, 1.1, 1.0, 1.0, 1.0)  // Correct: Attack=0.9, Defense=1.1
```

**Parameter order is: (attack, defense, spAtk, spDef, speed)** - NOT alphabetical!

## Datasource

Basically it is using these two as the true data sources of Pokemons.

* [Poke API](https://pokeapi.co/)
* [ポケモン徹底攻略](https://yakkun.com/sv/zukan/n1)
