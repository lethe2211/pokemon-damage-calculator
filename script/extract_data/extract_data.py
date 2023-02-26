import os
import time
import json

import requests
from bs4 import BeautifulSoup

# TODO: Fix the logic so that we can repeatedly generate the data file
def extract_move_data():
    if os.path.isfile('output/move_data.json'):
      print('Stop processing')
      return

    with open('output/move_data.json', 'a') as f:
      for i in range(1, 901):
        res = requests.get('https://pokeapi.co/api/v2/move/{0}'.format(i)).json()
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
    move_list_sv_tmp = [i.find('td').find('a').get_text() for i in soup.select('tr.sort_tr')] + ['３ぼんのや', 'ＤＤラリアット', '１０まんばりき', '１０まんボルト' + 'Ｇのちから']

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
      res = requests.get('https://pokeapi.co/api/v2/pokemon/{0}'.format(e)).json()
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
      res = requests.get('https://pokeapi.co/api/v2/pokemon-species/{0}'.format(i)).json()
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
      res = requests.get('https://pokeapi.co/api/v2/pokemon-form/{0}'.format(e)).json()
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
        pokemon_species_data_json = json.loads(pokemon_species_data.read())
        pokemon_forms_data_json = json.loads(pokemon_forms_data.read())

        output = []
        pokemon_names = set()
        duplicated_pokemon_names = set()

        for e in pokemon_data_json:
          pokemon_id = e['id']

          species_id = int(e['species']['url'].split('/')[-2])
          print(species_id)

          form_ids = [int(i['url'].split('/')[-2]) for i in e['forms']]
          print(form_ids)

          for f in pokemon_species_data_json:
            if f['id'] == species_id:
              name_en = [i['name'] for i in f['names'] if i['language']['name'] == 'en'][0]
              name_jp = [i['name'] for i in f['names'] if i['language']['name'] == 'ja'][0]

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
                moves.append(int(f['move']['url'].split('/')[-2]))
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
          form_ids = [int(i['url'].split('/')[-2]) for i in e['forms']]

          for f in pokemon_species_data_json:
            if f['id'] == species_id:
              name_en = [x['name'] for x in f['names'] if x['language']['name'] == 'en'][0]
              name_jp = [x['name'] for x in f['names'] if x['language']['name'] == 'ja'][0]

          if name_en in duplicated_pokemon_names:
            target_form_data = [x for x in pokemon_forms_data_json if x['id'] == form_ids[0]][0]

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
            elif len([x for x in target_form_data['form_names'] if x['language']['name'] == 'en']) == 0 or len([x for x in target_form_data['form_names'] if x['language']['name'] == 'ja']) == 0: # Give up!
              name_en = output[i]['name_en']
              name_jp = output[i]['name_jp']
              # print(name_en)
              # print(name_jp)
              output[i]['name_en'] = name_en
              output[i]['name_jp'] = name_jp
            elif len(target_form_data['form_names']) > 0:
              name_en = output[i]['name_en'] + ' (' + [x['name'] for x in target_form_data['form_names'] if x['language']['name'] == 'en'][0] + ')'
              name_jp = output[i]['name_jp'] + '（' + [x['name'] for x in target_form_data['form_names'] if x['language']['name'] == 'ja'][0] + '）'
              # print(name_en)
              # print(name_jp)
              output[i]['name_en'] = name_en
              output[i]['name_jp'] = name_jp

        with open('../../frontend/data/pokemon_data_sv.json', 'w') as file:
          file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
  pass
  # extract_move_data()
  # extract_move_data2()
  # fetch_pokemon_data()
  # fetch_pokemon_species_data()
  # fetch_pokemon_forms_data(
  # convert_pokemon_data()
