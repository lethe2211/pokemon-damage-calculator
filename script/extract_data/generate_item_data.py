import os
import json


def generate_item_data():
    if os.path.isfile('../../frontend/data/item_data_sv.json'):
        print('Stop processing')
        return

    output = [
        {
            "id": 0,
            "poke_api_id": 0,
            "name_en": "No items",
            "name_jp": "アイテムなし",
            "description_en": "No effects",
            "description_jp": "未対応 or 効果なし",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 1,
            "poke_api_id": 1702,
            "name_en": "Loaded Dice",
            "name_jp": "いかさまダイス",
            "description_en": "Always 4 hits for multi-hit moves",
            "description_jp": "連続技の回数が必ず4回になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 2,
            "poke_api_id": 247,
            "name_en": "Life Orb",
            "name_jp": "いのちのたま",
            "description_en": "Boosts damage by 1.3x",
            "description_jp": "ダメージが1.3倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 3,
            "poke_api_id": 202,
            "name_en": "Soul Dew",
            "name_jp": "こころのしずく",
            "description_en": "Boosts power of Psychic and Dragon-type moves by 1.2x",
            "description_jp": "エスパー・ドラゴンタイプの技の威力が1.2倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 4,
            "poke_api_id": 197,
            "name_en": "Choice Band",
            "name_jp": "こだわりハチマキ",
            "description_en": "Boosts Attack by 1.5x",
            "description_jp": "こうげきが1.5倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 5,
            "poke_api_id": 274,
            "name_en": "Choice Specs",
            "name_jp": "こだわりメガネ",
            "description_en": "Boosts Special Attack by 1.5x",
            "description_jp": "とくこうが1.5倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 6,
            "poke_api_id": 203,
            "name_en": "Deep Sea Tooth",
            "name_jp": "しんかいのキバ",
            "description_en": "Boosts Special Attack by 2.0x",
            "description_jp": "とくこうが2.0倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 7,
            "poke_api_id": -1,
            "name_en": "Items to empower a specific type of moves",
            "name_jp": "タイプ強化系",
            "description_en": "Boosts power of specific type moves by 1.2x",
            "description_jp": "わざの威力が1.2倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 8,
            "poke_api_id": 245,
            "name_en": "Expert Belt",
            "name_jp": "たつじんのおび",
            "description_en": "Boosts power of super-effective moves by 1.2x",
            "description_jp": "こうかばつぐんのわざの威力が1.2倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 9,
            "poke_api_id": 213,
            "name_en": "Light Ball",
            "name_jp": "でんきだま",
            "description_en": "Boosts Attack and Special Attack by 2.0x",
            "description_jp": "こうげき、とくこうが2.0倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 10,
            "poke_api_id": 243,
            "name_en": "Muscle Band",
            "name_jp": "ちからのハチマキ",
            "description_en": "Boosts physical moves by 1.1x",
            "description_jp": "物理技の威力が1.1倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 11,
            "poke_api_id": 669,
            "name_en": "Normal Gem",
            "name_jp": "ノーマルジュエル",
            "description_en": "Boosts power of Normal-type moves by 1.3x",
            "description_jp": "ノーマルタイプのわざの威力が1.3倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 12,
            "poke_api_id": 1182,
            "name_en": "Punch Gloves",
            "name_jp": "パンチグローブ",
            "description_en": "Boosts power of Punch moves by 1.1x",
            "description_jp": "パンチわざの威力が1.1倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 13,
            "poke_api_id": 1181,
            "name_en": "Utility Umbrella",
            "name_jp": "ばんのうがさ",
            "description_en": "Negates weather effects",
            "description_jp": "はれ、あめを無効化する",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 14,
            "poke_api_id": 235,
            "name_en": "Thick Club",
            "name_jp": "ふといホネ",
            "description_en": "Boosts Attack by 2.0x",
            "description_jp": "こうげきが2.0倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 15,
            "poke_api_id": 244,
            "name_en": "Wise Glasses",
            "name_jp": "ものしりメガネ",
            "description_en": "Boosts Special Attack by 1.1x",
            "description_jp": "とくこうが1.1倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 16,
            "poke_api_id": 2105,
            "name_en": "Fairy Feather",
            "name_jp": "ようせいのハネ",
            "description_en": "Boosts power of Fairy-type moves by 1.1x",
            "description_jp": "フェアリータイプのわざの威力が1.1倍になる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": False
        },
        {
            "id": 17,
            "poke_api_id": 2106,
            "name_en": "Wellspring Mask",
            "name_jp": "いどのめん",
            "description_en": "Changes the type to Grass/Water and the ability to Rain Dish.",
            "description_jp": "タイプがくさ、みずになる。とくせいがちょすいになる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 18,
            "poke_api_id": 2107,
            "name_en": "Hearthflame Mask",
            "name_jp": "かまどのめん",
            "description_en": "Changes the type to Grass/Fire and the ability to Mold Breaker.",
            "description_jp": "タイプがくさ、ほのおになる。とくせいがかたやぶりになる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 19,
            "poke_api_id": 2108,
            "name_en": "Cornerstone Mask",
            "name_jp": "いしずえのめん",
            "description_en": "Changes the type to Grass/Rock and the ability to Sturdy.",
            "description_jp": "タイプがくさ、いわになる。とくせいががんじょうになる",
            "valid_in_attacking_pokemon": True,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 20,
            "poke_api_id": -1,
            "name_en": "Berries that reduce the damage",
            "name_jp": "半減きのみ",
            "description_en": "Reduces damage by half",
            "description_jp": "ダメージを半減する",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 21,
            "poke_api_id": 581,
            "name_en": "Eviolite",
            "name_jp": "しんかのきせき",
            "description_en": "Boosts Defense and Special Defense by 1.5x.",
            "description_jp": "ぼうぎょ、とくぼうが1.5倍になる",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 22,
            "poke_api_id": 204,
            "name_en": "Deep Sea Scale",
            "name_jp": "しんかいのウロコ",
            "description_en": "Boosts Special Defense by 2.0x.",
            "description_jp": "とくぼうが2.0倍になる",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 23,
            "poke_api_id": 683,
            "name_en": "Assault Vest",
            "name_jp": "とつげきチョッキ",
            "description_en": "Boosts Special Defense by 1.5x.",
            "description_jp": "とくぼうが1.5倍になる",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 24,
            "poke_api_id": 234,
            "name_en": "Metal Powder",
            "name_jp": "メタルパウダー",
            "description_en": "Boosts Defense by 2.0x.",
            "description_jp": "ぼうぎょが2.0倍になる",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        },
        {
            "id": 25,
            "poke_api_id": -1,
            "name_en": "Other Items",
            "name_jp": "その他アイテム",
            "description_en": "Not supported or No effects",
            "description_jp": "未対応 or 効果なし",
            "valid_in_attacking_pokemon": False,
            "valid_in_defending_pokemon": True
        }
    ]
    with open('../../frontend/data/item_data_sv.json', 'w') as file:
        file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    generate_item_data()
