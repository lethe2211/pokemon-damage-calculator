"""
Update descriptions for implemented abilities only.
This script fetches ability descriptions from PokeAPI for the 30 implemented abilities
and updates ability_data_sv.json accordingly.
"""
import json
import time
import requests


# List of implemented ability IDs (Phase 1-5b)
IMPLEMENTED_ABILITIES = [
    # Phase 2: Power Modifiers
    89,   # Iron Fist (てつのこぶし)
    101,  # Technician (テクニシャン)
    181,  # Tough Claws (かたいツメ)
    125,  # Sheer Force (ちからずく)
    159,  # Sand Force (すなのちから)
    # Phase 3: Attack/Defense Modifiers
    55,   # Hustle (はりきり)
    62,   # Guts (こんじょう)
    37,   # Huge Power (ちからもち)
    74,   # Pure Power (ヨガパワー)
    85,   # Heatproof (たいねつ)
    # Phase 4: Damage Modifiers & Type Immunities
    111,  # Filter (フィルター)
    116,  # Solid Rock (ハードロック)
    232,  # Prism Armor (プリズムアーマー)
    136,  # Multiscale (マルチスケイル)
    110,  # Tinted Lens (いろめがね)
    97,   # Sniper (スナイパー)
    47,   # Thick Fat (あついしぼう)
    26,   # Levitate (ふゆう)
    157,  # Sap Sipper (そうしょく)
    10,   # Volt Absorb (ちくでん)
    11,   # Water Absorb (ちょすい)
    18,   # Flash Fire (もらいび)
    31,   # Lightning Rod (ひらいしん)
    114,  # Storm Drain (よびみず)
    # Phase 5a: Type Conversion & Weather
    182,  # Pixilate (フェアリースキン)
    184,  # Aerilate (スカイスキン)
    206,  # Galvanize (エレキスキン)
    174,  # Refrigerate (フリーズスキン)
    94,   # Solar Power (サンパワー)
    # Phase 5b: Normalize
    96,   # Normalize (ノーマルスキン)
]


def fetch_ability_descriptions(ability_id):
    """Fetch ability descriptions from PokeAPI."""
    url = f'https://pokeapi.co/api/v2/ability/{ability_id}'
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Failed to fetch ability {ability_id}: {response.status_code}")
        return None, None

    data = response.json()

    # Extract English description from effect_entries
    desc_en_list = [x['effect'] for x in data.get('effect_entries', [])
                   if x['language']['name'] == 'en']
    description_en = desc_en_list[0] if desc_en_list else None

    # Extract Japanese description from flavor_text_entries (most recent version)
    flavor_jp_list = [x['flavor_text'] for x in data.get('flavor_text_entries', [])
                     if x['language']['name'] in ['ja-Hrkt', 'ja']]
    # Use the most recent entry (last one in the list)
    description_jp = flavor_jp_list[-1] if flavor_jp_list else None

    return description_en, description_jp


def update_ability_data():
    """Update ability_data_sv.json with descriptions for implemented abilities."""
    json_path = '../../frontend/data/ability_data_sv.json'

    # Read current data
    with open(json_path, 'r') as file:
        abilities = json.load(file)

    print(f"Loaded {len(abilities)} abilities from {json_path}")
    print(f"Updating {len(IMPLEMENTED_ABILITIES)} implemented abilities...\n")

    updated_count = 0

    for ability_id in IMPLEMENTED_ABILITIES:
        # Find the ability in the list
        ability = next((a for a in abilities if a['id'] == ability_id), None)

        if not ability:
            print(f"⚠️  Ability ID {ability_id} not found in JSON")
            continue

        print(f"Fetching: {ability['name_jp']} ({ability['name_en']}) - ID {ability_id}")

        # Fetch descriptions from PokeAPI
        desc_en, desc_jp = fetch_ability_descriptions(ability_id)

        if desc_en and desc_jp:
            ability['description_en'] = desc_en
            ability['description_jp'] = desc_jp
            updated_count += 1
            print(f"✓ Updated")
        else:
            print(f"⚠️  Failed to fetch descriptions")

        # Be nice to the API
        time.sleep(0.5)
        print()

    # Write updated data back
    with open(json_path, 'w') as file:
        json.dump(abilities, file, ensure_ascii=False, indent=2)

    print(f"\n✅ Successfully updated {updated_count}/{len(IMPLEMENTED_ABILITIES)} abilities")
    print(f"📝 Updated file: {json_path}")


if __name__ == "__main__":
    update_ability_data()
