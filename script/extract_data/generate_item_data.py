import os
import json


def generate_item_data():
    if os.path.isfile('../../frontend/data/item_data_sv.json'):
        print('Stop processing')
        return

    output = [
        {
            'id': 0,
            'poke_api_id': 0,
            'name_en': 'No items',
            'name_jp': 'アイテムなし',
            'description_en': 'No effects',
            'description_jp': '効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 1,
            'poke_api_id': 1702,
            'name_en': 'Loaded Dice',
            'name_jp': 'いかさまダイス',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 2,
            'poke_api_id': 247,
            'name_en': 'Life Orb',
            'name_jp': 'いのちのたま',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 3,
            'poke_api_id': 202,
            'name_en': 'Soul Dew',
            'name_jp': 'こころのしずく',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 4,
            'poke_api_id': 197,
            'name_en': 'Choice Band',
            'name_jp': 'こだわりハチマキ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 5,
            'poke_api_id': 274,
            'name_en': 'Choice Specs',
            'name_jp': 'こだわりメガネ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 6,
            'poke_api_id': 203,
            'name_en': 'Deep Sea Tooth',
            'name_jp': 'しんかいのキバ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 7,
            'poke_api_id': -1,
            'name_en': 'Items to enpower a specific type of moves',
            'name_jp': 'タイプ強化系',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 8,
            'poke_api_id': 245,
            'name_en': 'Expert Belt',
            'name_jp': 'たつじんのおび',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 9,
            'poke_api_id': 213,
            'name_en': 'Light Ball',
            'name_jp': 'でんきだま',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 10,
            'poke_api_id': 243,
            'name_en': 'Muscle Band',
            'name_jp': 'ちからのハチマキ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 11,
            'poke_api_id': 669,
            'name_en': 'Normal Gem',
            'name_jp': 'ノーマルジュエル',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 12,
            'poke_api_id': 1181,
            'name_en': 'Utility Umbrella',
            'name_jp': 'ばんのうがさ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 13,
            'poke_api_id': 235,
            'name_en': 'Thick Club',
            'name_jp': 'ふといホネ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 14,
            'poke_api_id': 244,
            'name_en': 'Wise Glasses',
            'name_jp': 'ものしりメガネ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 15,
            'poke_api_id': -1,
            'name_en': 'Berries that reduce the damage',
            'name_jp': '半減きのみ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 16,
            'poke_api_id': 581,
            'name_en': 'Eviolite',
            'name_jp': 'しんかのきせき',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 17,
            'poke_api_id': 204,
            'name_en': 'Deep Sea Scale',
            'name_jp': 'しんかいのウロコ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 18,
            'poke_api_id': 683,
            'name_en': 'Assault Vest',
            'name_jp': 'とつげきチョッキ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 19,
            'poke_api_id': 234,
            'name_en': 'Metal Powder',
            'name_jp': 'メタルパウダー',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 20,
            'poke_api_id': -1,
            'name_en': 'Other Items',
            'name_jp': 'その他アイテム',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        }
    ]
    with open('../../frontend/data/item_data_sv.json', 'w') as file:
        file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    generate_item_data()
