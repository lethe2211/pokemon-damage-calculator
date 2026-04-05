import json
from pathlib import Path
from typing import Optional


class DataLoader:
    """Loads and queries Pokemon data from frontend/data/ JSON files."""

    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.pokemon_data = self._load_json("pokemon_data_sv.json")
        self.move_data = self._load_json("move_data_sv.json")
        self.ability_data = self._load_json("ability_data_sv.json")
        self.item_data = self._load_json("item_data_sv.json")

    def _load_json(self, filename: str) -> list[dict]:
        with open(self.data_dir / filename, encoding="utf-8") as f:
            return json.load(f)

    def get_sv_pokemon(self) -> list[dict]:
        """Get all Pokemon available in Scarlet/Violet."""
        return [p for p in self.pokemon_data if p.get("sv", False)]

    def get_pokemon_by_name_jp(self, name_jp: str) -> Optional[dict]:
        """Look up a Pokemon by its Japanese name."""
        for p in self.pokemon_data:
            if p["name_jp"] == name_jp:
                return p
        return None

    def get_pokemon_by_id(self, pokemon_id: int) -> Optional[dict]:
        """Look up a Pokemon by its ID."""
        for p in self.pokemon_data:
            if p["id"] == pokemon_id:
                return p
        return None

    def get_move_by_name_jp(self, name_jp: str) -> Optional[dict]:
        """Look up a move by its Japanese name."""
        for m in self.move_data:
            if m["name_jp"] == name_jp:
                return m
        return None

    def get_move_by_id(self, move_id: int) -> Optional[dict]:
        """Look up a move by its ID."""
        for m in self.move_data:
            if m["id"] == move_id:
                return m
        return None

    def get_ability_by_name_jp(self, name_jp: str) -> Optional[dict]:
        """Look up an ability by its Japanese name."""
        for a in self.ability_data:
            if a["name_jp"] == name_jp:
                return a
        return None

    def get_item_by_name_jp(self, name_jp: str) -> Optional[dict]:
        """Look up an item by its Japanese name."""
        for i in self.item_data:
            if i["name_jp"] == name_jp:
                return i
        return None

    def get_learnable_damage_moves(self, pokemon_id: int) -> list[dict]:
        """Get all damage-dealing moves that a Pokemon can learn."""
        pokemon = self.get_pokemon_by_id(pokemon_id)
        if not pokemon:
            return []
        move_ids = pokemon.get("moves", [])
        moves = []
        for mid in move_ids:
            move = self.get_move_by_id(mid)
            if move and move.get("power") and move["power"] > 0:
                moves.append(move)
        return moves

    def get_pokemon_abilities(self, pokemon_id: int) -> list[dict]:
        """Get all abilities that a Pokemon can have."""
        abilities = []
        for a in self.ability_data:
            if pokemon_id in a.get("pokemons", []):
                abilities.append(a)
        return abilities

    def get_valid_attacker_items(self) -> list[dict]:
        """Get items valid for the attacking Pokemon (excluding generic placeholders)."""
        generic_ids = {7, 20, 25}  # Type boost generic, Berry generic, Other generic
        return [
            i for i in self.item_data
            if i.get("valid_in_attacking_pokemon", False) and i["id"] not in generic_ids
        ]

    def get_valid_defender_items(self) -> list[dict]:
        """Get items valid for the defending Pokemon (excluding generic placeholders)."""
        generic_ids = {7, 20, 25}
        return [
            i for i in self.item_data
            if i.get("valid_in_defending_pokemon", False) and i["id"] not in generic_ids
        ]
