from dataclasses import dataclass, field, asdict
from typing import Optional


@dataclass
class StatValues:
    hp: int = 0
    attack: int = 0
    defense: int = 0
    sp_atk: int = 0
    sp_def: int = 0
    speed: int = 0


@dataclass
class NatureModifiers:
    attack: float = 1.0
    defense: float = 1.0
    sp_atk: float = 1.0
    sp_def: float = 1.0
    speed: float = 1.0


@dataclass
class StatsRank:
    attack: int = 0
    defense: int = 0
    sp_atk: int = 0
    sp_def: int = 0
    speed: int = 0


@dataclass
class AttackerCondition:
    pokemon_name_jp: str
    move_name_jp: str
    level: int = 50
    ev: StatValues = field(default_factory=StatValues)
    iv: StatValues = field(default_factory=lambda: StatValues(31, 31, 31, 31, 31, 31))
    nature: NatureModifiers = field(default_factory=NatureModifiers)
    ability_name_jp: Optional[str] = None
    item_name_jp: Optional[str] = None
    stats_rank: StatsRank = field(default_factory=StatsRank)
    is_critical: bool = False
    status_ailment: Optional[str] = None
    tera_type: Optional[str] = None


@dataclass
class DefenderCondition:
    pokemon_name_jp: str
    level: int = 50
    ev: StatValues = field(default_factory=StatValues)
    iv: StatValues = field(default_factory=lambda: StatValues(31, 31, 31, 31, 31, 31))
    nature: NatureModifiers = field(default_factory=NatureModifiers)
    ability_name_jp: Optional[str] = None
    item_name_jp: Optional[str] = None
    stats_rank: StatsRank = field(default_factory=StatsRank)
    status_ailment: Optional[str] = None


@dataclass
class EnvironmentCondition:
    weather: Optional[str] = None
    terrain: Optional[str] = None


@dataclass
class BattleCondition:
    attacker: AttackerCondition
    defender: DefenderCondition
    environment: EnvironmentCondition = field(default_factory=EnvironmentCondition)

    @staticmethod
    def from_dict(d: dict) -> "BattleCondition":
        attacker_d = d["attacker"]
        defender_d = d["defender"]
        env_d = d.get("environment", {})

        attacker = AttackerCondition(
            pokemon_name_jp=attacker_d["pokemon_name_jp"],
            move_name_jp=attacker_d["move_name_jp"],
            level=attacker_d.get("level", 50),
            ev=StatValues(**attacker_d.get("ev", {})),
            iv=StatValues(**attacker_d.get("iv", {"hp": 31, "attack": 31, "defense": 31, "sp_atk": 31, "sp_def": 31, "speed": 31})),
            nature=NatureModifiers(**attacker_d.get("nature", {})),
            ability_name_jp=attacker_d.get("ability_name_jp"),
            item_name_jp=attacker_d.get("item_name_jp"),
            stats_rank=StatsRank(**attacker_d.get("stats_rank", {})),
            is_critical=attacker_d.get("is_critical", False),
            status_ailment=attacker_d.get("status_ailment"),
            tera_type=attacker_d.get("tera_type"),
        )

        defender = DefenderCondition(
            pokemon_name_jp=defender_d["pokemon_name_jp"],
            level=defender_d.get("level", 50),
            ev=StatValues(**defender_d.get("ev", {})),
            iv=StatValues(**defender_d.get("iv", {"hp": 31, "attack": 31, "defense": 31, "sp_atk": 31, "sp_def": 31, "speed": 31})),
            nature=NatureModifiers(**defender_d.get("nature", {})),
            ability_name_jp=defender_d.get("ability_name_jp"),
            item_name_jp=defender_d.get("item_name_jp"),
            stats_rank=StatsRank(**defender_d.get("stats_rank", {})),
            status_ailment=defender_d.get("status_ailment"),
        )

        environment = EnvironmentCondition(
            weather=env_d.get("weather"),
            terrain=env_d.get("terrain"),
        )

        return BattleCondition(attacker=attacker, defender=defender, environment=environment)


@dataclass
class ExternalResult:
    min_damage: int
    max_damage: int
    min_damage_ratio: float
    max_damage_ratio: float
    ko_text: str
    raw_text: str


@dataclass
class TestCaseOutput:
    battle_condition: BattleCondition
    external_result: ExternalResult
    screenshot_path: str
    timestamp: str

    def to_dict(self) -> dict:
        return asdict(self)
