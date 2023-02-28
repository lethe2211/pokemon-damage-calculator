import os
import time
import json

import requests
from bs4 import BeautifulSoup


def extract_move_data():
    # TODO: Fix the logic so that we can repeatedly generate the data file
    if os.path.isfile('output/move_data.json'):
        print('Stop processing')
        return

    with open('output/move_data.json', 'a') as f:
        for i in range(1, 901):
            res = requests.get(
                'https://pokeapi.co/api/v2/move/{0}'.format(i)).json()
            reduced_result = {
                'id': res['id'],
                'nameEn': [x['name'] for x in res['names'] if x['language']['name'] == 'en'][0],
                'nameJp': [x['name'] for x in res['names'] if x['language']['name'] == 'ja'][0],
                'accuracy': res['accuracy'],
                'pp': res['pp'],
                'priority': res['priority'],
                'power': res['power'],
                'damage_class': res['damage_class']['name'],
                'learned_by_pokemon': [int(x['url'].split('/')[-2]) for x in res['learned_by_pokemon']],
                'machine': res['machines'],
                'target': res['target']['name'],
                'type': res['type']['name']
            }
            print(reduced_result)

            f.write(json.dumps(reduced_result, ensure_ascii=False) + '\n')
            time.sleep(0.5)


def extract_move_data2():
    move_list_sv_tmp = None
    move_list_all = None

    # TODO: Write scripts to fetch Poketetsu data
    with open('input/poketetsu_move_data.html', 'r') as file:
        soup = BeautifulSoup(file.read(), 'html.parser')
        move_list_sv_tmp = [i.find('td').find('a').get_text() for i in soup.select(
            'tr.sort_tr')] + ['３ぼんのや', 'ＤＤラリアット', '１０まんばりき', '１０まんボルト' + 'Ｇのちから']

    with open('../../frontend/data/move_data.json', 'r') as file:
        move_list_all = json.loads(file.read())

        for e in move_list_all:
            if e['nameJp'] in move_list_sv_tmp:
                e['sv'] = True
            else:
                e['sv'] = False

        with open('../../frontend/data/move_data_sv.json', 'w') as file:
            file.write(json.dumps(move_list_all, ensure_ascii=False))


def fetch_pokemon_data():
    if os.path.isfile('output/pokemon_data_orig.json'):
        print('Stop processing')
        return

    with open('output/pokemon_data_orig.json', 'w') as file:
        file.write('[\n')

        for i, e in enumerate(list(range(1, 1009)) + list(range(10001, 10272))):
            res = requests.get(
                'https://pokeapi.co/api/v2/pokemon/{0}'.format(e)).json()
            print(res)
            if e == 10271:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


def fetch_pokemon_species_data():
    if os.path.isfile('output/pokemon_species_data_orig.json'):
        print('Stop processing')
        return

    with open('output/pokemon_species_data_orig.json', 'w') as file:
        file.write('[\n')

        for i in range(1, 1009):
            res = requests.get(
                'https://pokeapi.co/api/v2/pokemon-species/{0}'.format(i)).json()
            print(res)
            if i == 1008:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


def fetch_pokemon_forms_data():
    if os.path.isfile('output/pokemon_forms_data_orig.json'):
        print('Stop processing')
        return

    with open('output/pokemon_forms_data_orig.json', 'w') as file:
        file.write('[\n')

        for i, e in enumerate(list(range(1, 1009)) + list(range(10001, 10441))):
            res = requests.get(
                'https://pokeapi.co/api/v2/pokemon-form/{0}'.format(e)).json()
            print(res)
            if e == 10440:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


def convert_pokemon_data():
    if os.path.isfile('../../frontend/data/pokemon_data_sv.json'):
        print('Stop processing')
        return

    with open('output/pokemon_data_orig.json', 'r') as pokemon_data:
        with open('output/pokemon_species_data_orig.json', 'r') as pokemon_species_data:
            with open('output/pokemon_forms_data_orig.json', 'r') as pokemon_forms_data:
                pokemon_data_json = json.loads(pokemon_data.read())
                pokemon_species_data_json = json.loads(
                    pokemon_species_data.read())
                pokemon_forms_data_json = json.loads(pokemon_forms_data.read())

                output = []
                pokemon_names = set()
                duplicated_pokemon_names = set()

                for e in pokemon_data_json:
                    pokemon_id = e['id']

                    species_id = int(e['species']['url'].split('/')[-2])
                    print(species_id)

                    form_ids = [int(i['url'].split('/')[-2])
                                for i in e['forms']]
                    print(form_ids)

                    for f in pokemon_species_data_json:
                        if f['id'] == species_id:
                            name_en = [i['name'] for i in f['names']
                                       if i['language']['name'] == 'en'][0]
                            name_jp = [i['name'] for i in f['names']
                                       if i['language']['name'] == 'ja'][0]

                    if name_en in pokemon_names:
                        duplicated_pokemon_names.add(name_en)
                    pokemon_names.add(name_en)

                    type1 = None
                    type2 = None
                    for f in e['types']:
                        if f['slot'] == 1:
                            type1 = int(f['type']['url'].split('/')[-2])
                        elif f['slot'] == 2:
                            type2 = int(f['type']['url'].split('/')[-2])

                    base_stats = {
                        "hp": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'hp'][0],
                        "attack": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'attack'][0],
                        "defense": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'defense'][0],
                        "sp_atk": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'special-attack'][0],
                        "sp_def": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'special-defense'][0],
                        "speed": [i['base_stat'] for i in e['stats'] if i['stat']['name'] == 'speed'][0]
                    }

                    moves = []
                    for f in e['moves']:
                        for g in f['version_group_details']:
                            if g['version_group']['name'] == 'scarlet-violet':
                                moves.append(
                                    int(f['move']['url'].split('/')[-2]))
                                break

                    sv = moves != []

                    output_pokemon_data = {
                        'id': pokemon_id,
                        'species_id': species_id,
                        'form_ids': form_ids,
                        'name_en': name_en,
                        'name_jp': name_jp,
                        'type1': type1,
                        'type2': type2,
                        'base_stats': base_stats,
                        'moves': moves,
                        'sv': sv
                    }
                    # print(output_pokemon_data)

                    output.append(output_pokemon_data)

                # Edit the name of pokemon which has multiple forms
                for i, e in enumerate(pokemon_data_json):
                    pokemon_id = e['id']
                    species_id = int(e['species']['url'].split('/')[-2])
                    form_ids = [int(i['url'].split('/')[-2])
                                for i in e['forms']]

                    for f in pokemon_species_data_json:
                        if f['id'] == species_id:
                            name_en = [x['name'] for x in f['names']
                                       if x['language']['name'] == 'en'][0]
                            name_jp = [x['name'] for x in f['names']
                                       if x['language']['name'] == 'ja'][0]

                    if name_en in duplicated_pokemon_names:
                        target_form_data = [
                            x for x in pokemon_forms_data_json if x['id'] == form_ids[0]][0]

                        if target_form_data["name"] == "raticate-totem-alola":
                            name_en = "Raticate (Totem Alola)"
                            name_jp = "ラッタ（アローラのすがた、ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "greninja-battle-bond":
                            name_en = "Greninja (Battle Bond)"
                            name_jp = "ゲッコウガ（きずなへんげ）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "gumshoos-totem":
                            name_en = "Gumshoos (Totem)"
                            name_jp = "デカグース（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "vikavolt-totem":
                            name_en = "Vikavolt (Totem)"
                            name_jp = "クワガノン（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "lurantis-totem":
                            name_en = "Lurantis (Totem)"
                            name_jp = "ラランテス（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "salazzle-totem":
                            name_en = "Salazzle (Totem)"
                            name_jp = "エンニュート（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "mimikyu-totem-disguised":
                            name_en = "Mimikyu (Totem Disguised)"
                            name_jp = "ミミッキュ（ばけたすがた、ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "mimikyu-totem-busted":
                            name_en = "Mimikyu (Totem Busted)"
                            name_jp = "ミミッキュ（ばれたすがた、ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "kommo-o-totem":
                            name_en = "Grandiras (Totem)"
                            name_jp = "ジャラランガ（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "marowak-totem":
                            name_en = "Marowak (Totem)"
                            name_jp = "ガラガラ（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "ribombee-totem":
                            name_en = "Ribombee (Totem)"
                            name_jp = "アブリボン（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "rockruff-own-tempo":
                            name_en = "Rockruff (Own Tempo)"
                            name_jp = "イワンコ（マイペース）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "araquanid-totem":
                            name_en = "Araquanid (Totem)"
                            name_jp = "オニシズクモ（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "togedemaru-totem":
                            name_en = "Togedemaru (Totem)"
                            name_jp = "トゲデマル（ぬし）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif target_form_data["name"] == "pikachu-starter":
                            name_en = "Pikachu (Partner)"
                            name_jp = "ピカチュウ（はじめてのポケモン）"
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif len([x for x in target_form_data['form_names'] if x['language']['name'] == 'en']) == 0 or len([x for x in target_form_data['form_names'] if x['language']['name'] == 'ja']) == 0:  # Give up!
                            name_en = output[i]['name_en']
                            name_jp = output[i]['name_jp']
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp
                        elif len(target_form_data['form_names']) > 0:
                            name_en = output[i]['name_en'] + ' (' + [
                                x['name'] for x in target_form_data['form_names'] if x['language']['name'] == 'en'][0] + ')'
                            name_jp = output[i]['name_jp'] + '（' + [x['name']
                                                                    for x in target_form_data['form_names'] if x['language']['name'] == 'ja'][0] + '）'
                            # print(name_en)
                            # print(name_jp)
                            output[i]['name_en'] = name_en
                            output[i]['name_jp'] = name_jp

                with open('../../frontend/data/pokemon_data_sv.json', 'w') as file:
                    file.write(json.dumps(output, ensure_ascii=False))


def fetch_ability_data():
    if os.path.isfile('output/ability_data_orig.json'):
        print('Stop processing')
        return

    with open('output/ability_data_orig.json', 'w') as file:
        file.write('[\n')

        for e in list(range(1, 299)):
            res = requests.get(
                'https://pokeapi.co/api/v2/ability/{0}'.format(e)).json()
            print(res)
            if e == 298:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


def convert_ability_data():
    if os.path.isfile('../../frontend/data/ability_data_sv.json'):
        print('Stop processing')
        return

    with open('input/poketetsu_ability_data.html', 'r') as file:
        soup = BeautifulSoup(file.read(), 'html.parser')
        ability_list = [x.get_text()
                        for x in soup.select('tr > td.c1 > a')] + ['ＡＲシステム']
        print(ability_list)

    with open('output/ability_data_orig.json', 'r') as file:
        ability_list_all = json.loads(file.read())

        output = []
        for e in ability_list_all:
            output.append({
                'id': e['id'],
                'name_en': [x['name'] for x in e['names'] if x['language']['name'] == 'en'][0],
                'name_jp': [x['name'] for x in e['names'] if x['language']['name'] == 'ja'][0],
                'pokemons': [int(x['pokemon']['url'].split('/')[-2]) for x in e['pokemon']],
                'description_en': 'Not supported or No effects',
                'description_jp': '未対応 or 効果なし',
                'sv': [x['name'] for x in e['names'] if x['language']['name'] == 'ja'][0] in ability_list
            })

    with open('../../frontend/data/ability_data_sv.json', 'w') as file:
        file.write(json.dumps(output, ensure_ascii=False))


def fetch_item_data():
    if os.path.isfile('output/item_data_orig.json'):
        print('Stop processing')
        return

    with open('output/item_data_orig.json', 'w') as file:
        file.write('[\n')

        for e in list(range(1, 667)) + list(range(668, 672)) + list(range(673, 681)) + list(range(681, 750)) + list(range(760, 771)) + list(range(772, 777)) + list(range(779, 781)) + list(range(782, 792)) + list(range(793, 812)) + list(range(814, 848)) + list(range(877, 2100)) + list(range(10001, 10003)):
            try:
                res = requests.get(
                    'https://pokeapi.co/api/v2/item/{0}'.format(e)).json()
            except Exception as err:
                continue

            print(res)
            if e == 10002:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')

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
            'poke_api_id': -1,
            'name_en': 'Items to enpower a specific type of moves',
            'name_jp': 'タイプ強化系',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 7,
            'poke_api_id': 245,
            'name_en': 'Expert Belt',
            'name_jp': 'たつじんのおび',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 8,
            'poke_api_id': 213,
            'name_en': 'Light Ball',
            'name_jp': 'でんきだま',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 9,
            'poke_api_id': 243,
            'name_en': 'Muscle Band',
            'name_jp': 'ちからのハチマキ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 10,
            'poke_api_id': 669,
            'name_en': 'Normal Gem',
            'name_jp': 'ノーマルジュエル',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 11,
            'poke_api_id': 1181,
            'name_en': 'Utility Umbrella',
            'name_jp': 'ばんのうがさ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 12,
            'poke_api_id': 235,
            'name_en': 'Thick Club',
            'name_jp': 'ふといホネ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 13,
            'poke_api_id': 244,
            'name_en': 'Wise Glasses',
            'name_jp': 'ものしりメガネ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': True,
            'valid_in_defending_pokemon': False
        },
        {
            'id': 14,
            'poke_api_id': -1,
            'name_en': 'Berries that reduce the damage',
            'name_jp': '半減きのみ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 15,
            'poke_api_id': 581,
            'name_en': 'Eviolite',
            'name_jp': 'しんかのきせき',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 16,
            'poke_api_id': 683,
            'name_en': 'Assault Vest',
            'name_jp': 'とつげきチョッキ',
            'description_en': 'Not supported or No effects',
            'description_jp': '未対応 or 効果なし',
            'valid_in_attacking_pokemon': False,
            'valid_in_defending_pokemon': True
        },
        {
            'id': 17,
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
    pass
    # extract_move_data()
    # extract_move_data2()
    # fetch_pokemon_data()
    # fetch_pokemon_species_data()
    # fetch_pokemon_forms_data(
    # convert_pokemon_data()
    # fetch_ability_data()
    # convert_ability_data()
    # fetch_item_data()
    # generate_item_data()
