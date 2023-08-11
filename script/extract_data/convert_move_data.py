import os
import json

from bs4 import BeautifulSoup


def convert_move_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('../../frontend/data/move_data_sv.json'):
        print('Stop processing')
        return

    move_list_sv_tmp = None
    move_list_all = None

    # Fetch all the move data list in SV from Poke-Tetsu to compare with Poke API
    with open('output/poketetsu_move_data.html', 'r') as file:
        soup = BeautifulSoup(file.read(), 'html.parser')
        move_list_sv_tmp = [i.find('td').find('a').get_text() for i in soup.select(
            'tr.sort_tr')] + ['３ぼんのや', 'ＤＤラリアット', '１０まんばりき', '１０まんボルト' + 'Ｇのちから']  # Add moves that have full-width characters explicitly

    with open('output/move_data_orig.json', 'r') as file:
        move_list_all = json.loads(file.read())
        output = []

        for i, e in enumerate(move_list_all):
            print(e)

            # 901: ハイドロスチーム and 902: サイコブレイド is not yet registered in Poke API
            if e['id'] == 901:
                output_move_data = {
                    'id': 901,
                    'name_en': 'Hydro Steam',
                    'name_jp': 'ハイドロスチーム',
                    'accuracy': 100,
                    'pp': 15,
                    'priority': 0,
                    'power': 80,
                    'damage_class': 'special',
                    'target': 'selected-pokemon',
                    'type': 'water',
                    'sv': True,
                    'is_ohko': False
                }
            elif e['id'] == 902:
                output_move_data = {
                    'id': 902,
                    'name_en': 'Psyblade',
                    'name_jp': 'サイコブレイド',
                    'accuracy': 100,
                    'pp': 15,
                    'priority': 0,
                    'power': 80,
                    'damage_class': 'physical',
                    'target': 'selected-pokemon',
                    'type': 'psychic',
                    'sv': True,
                    'is_ohko': False
                }
            else:
                output_move_data = {
                    'id': e['id'],
                    'name_en': [x['name'] for x in e['names'] if x['language']['name'] == 'en'][0],
                    'name_jp': [x['name'] for x in e['names'] if x['language']['name'] == 'ja' or x['language']['name'] == 'ja-Hrkt'][0],
                    'accuracy': e['accuracy'],
                    'pp': e['pp'],
                    'priority': e['priority'],
                    'power': e['power'],
                    'damage_class': e['damage_class']['name'],
                    'target': e['target']['name'],
                    'type': e['type']['name'],
                    'sv': [x['name'] for x in e['names'] if x['language']['name'] == 'ja' or x['language']['name'] == 'ja-Hrkt'][0] in move_list_sv_tmp,
                    'is_ohko': e['id'] in [12, 32, 90, 329] # 12: ハサミギロチン, 32: つのドリル, 90: じわれ, 329: ぜったいれいど are OHKO
                }
            output.append(output_move_data)

        with open('../../frontend/data/move_data_sv.json', 'w') as file:
            file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    convert_move_data()
