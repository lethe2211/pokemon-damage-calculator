# Pokemon Damage Calculator

## Language Policy

All code, comments, commit messages, and documentation in this project MUST be written in English.

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

## Architecture

- `frontend/models/calculation-resources.ts` - Core damage calculation engine
- `frontend/models/` - Domain models (pokemon, move, type, stats, etc.)
- `frontend/components/` - React UI components
- `frontend/data/` - Static JSON data files (from PokeAPI)
- `script/extract_data/` - Python scripts for data extraction

## Datasource

Basically it is using these two as the true data sources of Pokemons.

* [Poke API](https://pokeapi.co/)
* [ポケモン徹底攻略](https://yakkun.com/sv/zukan/n1)
