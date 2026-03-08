# Pokemon Damage Calculator

[![CI](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/ci.yml)
[![Claude Code Review](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/claude-review.yml/badge.svg)](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/claude-review.yml)
[![Security Review](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/security-review.yml/badge.svg)](https://github.com/lethe2211/pokemon-damage-calculator/actions/workflows/security-review.yml)

A web application for calculating Pokemon damage in Pokemon Scarlet and Violet. Built as a Progressive Web App (PWA) with Next.js.

## Features

- Real-time damage calculation based on the official damage formula
- Support for all Pokemon, moves, abilities, and items in Scarlet/Violet
- Terastallize type support
- Weather and terrain effects
- Status ailment consideration (e.g., burn)
- Stat rank modifiers and nature corrections
- IV/EV customization
- Guaranteed KO turn calculation (min/max)
- PWA support (installable, works offline)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **PWA**: next-pwa
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Code Review**: Claude Code AI
- **Containerization**: Docker / Docker Compose

## Project Structure

```
pokemon-damage-calculator/
├── frontend/                # Next.js frontend application
│   ├── components/          # React components (attacking/defending pokemon, environment, result)
│   ├── data/                # Pokemon, move, ability, and item data (JSON)
│   ├── models/              # Domain models and damage calculation engine
│   ├── lib/                 # Utility functions
│   ├── pages/               # Next.js pages
│   ├── public/              # Static assets and PWA manifest
│   ├── styles/              # CSS styles
│   └── Dockerfile           # Frontend Docker image
├── script/extract_data/     # Python scripts for extracting data from PokeAPI
├── web/                     # Nginx configuration templates
├── db/                      # Database initialization scripts
└── docker-compose.yaml      # Docker Compose configuration
```

## Prerequisites

- Docker >= 24
- Docker Compose >= 2
- Node.js >= 18 (for local development)
- Python >= 3.10 (for data extraction scripts)

## Getting Started

### Using Docker (recommended)

```bash
docker compose up --build
```

The application will be available at `http://localhost:3000`.

### Local Development

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
cd frontend
npm test        # Watch mode
npm run test:ci # CI mode (single run)
```

### Linting

```bash
cd frontend
npm run lint
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- **Lint Check**: ESLint validation on every PR
- **Unit Tests**: Jest tests run automatically
- **Build Test**: Ensures successful production builds
- **Claude Code Review**: AI-powered code review on PRs
- **Security Review**: Automated security vulnerability scanning

For setup instructions, see [.github/SETUP_CI.md](.github/SETUP_CI.md).

## Data Extraction

Pokemon data is sourced from [PokeAPI](https://pokeapi.co/). To re-extract the data:

```bash
cd script/extract_data
pip install -r requirements.txt
python fetch_pokemon_data.py
python fetch_move_data.py
python fetch_ability_data.py
python fetch_item_data.py
python convert_pokemon_data.py
python convert_move_data.py
python convert_ability_data.py
python generate_item_data.py
```

## License

This project is licensed under the [MIT License](LICENSE).
