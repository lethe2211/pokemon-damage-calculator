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

## Architecture

- `frontend/models/calculation-resources.ts` - Core damage calculation engine
- `frontend/models/` - Domain models (pokemon, move, type, stats, etc.)
- `frontend/components/` - React UI components
- `frontend/data/` - Static JSON data files (from PokeAPI)
- `script/extract_data/` - Python scripts for data extraction
