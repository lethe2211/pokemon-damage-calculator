import os
import json

from bs4 import BeautifulSoup


def convert_ability_data():
    # Safeguard. Please delete this block when you run this script
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
            # Extract English description from effect_entries
            desc_en_list = [x['effect'] for x in e.get('effect_entries', []) if x['language']['name'] == 'en']
            description_en = desc_en_list[0] if desc_en_list else 'Not supported or No effects'

            # Extract Japanese description from flavor_text_entries (most recent SV version)
            # Filter for Japanese and prefer the most recent version
            flavor_jp_list = [x['flavor_text'] for x in e.get('flavor_text_entries', [])
                             if x['language']['name'] == 'ja-Hrkt' or x['language']['name'] == 'ja']
            # Use the most recent entry (last one in the list)
            description_jp = flavor_jp_list[-1] if flavor_jp_list else '未対応 or 効果なし'

            output.append({
                'id': e['id'],
                'name_en': [x['name'] for x in e['names'] if x['language']['name'] == 'en'][0],
                'name_jp': [x['name'] for x in e['names'] if x['language']['name'] == 'ja'][0],
                'pokemons': sorted(list(set([int(x['pokemon']['url'].split('/')[-2]) for x in e['pokemon']]))),
                'description_en': description_en,
                'description_jp': description_jp,
                'sv': [x['name'] for x in e['names'] if x['language']['name'] == 'ja'][0] in ability_list
            })

    with open('../../frontend/data/ability_data_sv.json', 'w') as file:
        file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    convert_ability_data()
