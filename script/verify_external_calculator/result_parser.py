import re

from models import ExternalResult


def parse_result(raw_text: str) -> ExternalResult:
    """Parse the external calculator's result text.

    Examples:
        "93 ~ 109 (60.0 ~ 70.4%) 確定2発"
        "0 ~ 0 (0 ~ 0%) --"
        "168 ~ 198 (100 ~ 118.0%) 確定1発"
        "45 ~ 54 (27.4 ~ 32.9%) 乱数3発"
    """
    pattern = r"(\d+)\s*~\s*(\d+)\s*\((\d+\.?\d*)\s*~\s*(\d+\.?\d*)%\)\s*(.*)"
    match = re.match(pattern, raw_text.strip())
    if match:
        return ExternalResult(
            min_damage=int(match.group(1)),
            max_damage=int(match.group(2)),
            min_damage_ratio=float(match.group(3)),
            max_damage_ratio=float(match.group(4)),
            ko_text=match.group(5).strip(),
            raw_text=raw_text.strip(),
        )
    raise ValueError(f"Could not parse result: {raw_text}")
