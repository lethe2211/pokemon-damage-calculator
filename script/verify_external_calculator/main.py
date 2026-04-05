#!/usr/bin/env python3
"""CLI entry point for verifying damage calculator results against pokesol.com.

Usage:
    # JSON file input mode
    python3 main.py --input path/to/conditions.json

    # Random mode (generate N cases)
    python3 main.py --random 5

    # Custom output directory
    python3 main.py --random 3 --output-dir path/to/output
"""

import argparse
import asyncio
import json
import sys
from dataclasses import asdict
from datetime import datetime
from pathlib import Path

from playwright.async_api import async_playwright

from data_loader import DataLoader
from models import BattleCondition, TestCaseOutput
from page_controller import PageController
from random_generator import RandomBattleGenerator
from result_parser import parse_result

# Default output directory relative to project root
DEFAULT_OUTPUT_DIR = "frontend/scripts/verify-external-calculator/external-results"


def get_project_root() -> Path:
    """Get the project root directory (two levels up from this script)."""
    return Path(__file__).parent.parent.parent


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Verify damage calculator results against pokesol.com"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--input",
        type=str,
        help="Path to JSON file with battle conditions",
    )
    group.add_argument(
        "--random",
        type=int,
        help="Generate N random battle conditions",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=None,
        help=f"Output directory for results (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--headed",
        action="store_true",
        help="Run browser in headed mode (visible) for debugging",
    )
    return parser.parse_args()


async def run(args: argparse.Namespace):
    project_root = get_project_root()
    data_dir = str(project_root / "frontend" / "data")
    data_loader = DataLoader(data_dir)

    # Load or generate battle conditions
    if args.input:
        input_path = Path(args.input)
        if not input_path.is_absolute():
            input_path = project_root / input_path
        with open(input_path, encoding="utf-8") as f:
            raw_conditions = json.load(f)
        conditions = [BattleCondition.from_dict(c) for c in raw_conditions]
        print(f"Loaded {len(conditions)} battle conditions from {input_path}")
    else:
        generator = RandomBattleGenerator(data_loader)
        conditions = generator.generate(args.random)
        print(f"Generated {args.random} random battle conditions")

    # Set up output directory
    output_dir = Path(args.output_dir) if args.output_dir else project_root / DEFAULT_OUTPUT_DIR
    if not output_dir.is_absolute():
        output_dir = project_root / output_dir
    screenshots_dir = output_dir / "screenshots"
    screenshots_dir.mkdir(parents=True, exist_ok=True)

    results: list[TestCaseOutput] = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=not args.headed)
        page = await browser.new_page()
        controller = PageController(page, data_loader)

        for i, condition in enumerate(conditions):
            attacker_name = condition.attacker.pokemon_name_jp
            move_name = condition.attacker.move_name_jp
            defender_name = condition.defender.pokemon_name_jp
            print(f"[{i + 1}/{len(conditions)}] {attacker_name} ->（{move_name}）-> {defender_name}")

            try:
                await controller.navigate()
                await controller.input_battle_condition(condition)

                # Wait for the result to update
                await page.wait_for_timeout(1000)

                # Extract result text
                raw_text = await controller.get_result()
                result = parse_result(raw_text)
                print(f"  Result: {raw_text}")

                # Take screenshot
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                screenshot_filename = f"case_{i:04d}_{timestamp}.png"
                screenshot_path = str(screenshots_dir / screenshot_filename)
                await controller.take_screenshot(screenshot_path)

                results.append(
                    TestCaseOutput(
                        battle_condition=condition,
                        external_result=result,
                        screenshot_path=f"screenshots/{screenshot_filename}",
                        timestamp=timestamp,
                    )
                )

            except Exception as e:
                print(f"  Error: {e}")
                # Take an error screenshot for debugging
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                error_screenshot = str(screenshots_dir / f"error_{i:04d}_{timestamp}.png")
                try:
                    await controller.take_screenshot(error_screenshot)
                except Exception:
                    pass
                continue

        await browser.close()

    # Save all results as JSON
    results_path = output_dir / "results.json"
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump([r.to_dict() for r in results], f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(results)} results to {results_path}")
    if len(results) < len(conditions):
        print(f"Warning: {len(conditions) - len(results)} cases failed")

    return len(results)


def main():
    args = parse_args()
    result_count = asyncio.run(run(args))
    sys.exit(0 if result_count > 0 else 1)


if __name__ == "__main__":
    main()
