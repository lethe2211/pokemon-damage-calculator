import os
import time
import json

import requests


def fetch_pokemon_forms_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('output/pokemon_forms_data_orig.json'):
        print('Stop processing')
        return

    with open('output/pokemon_forms_data_orig.json', 'w') as file:
        file.write('[\n')

        max_num_in_pokedex = 1010
        max_num_with_special_pokemon = 10440
        for i, e in enumerate(list(range(1, max_num_in_pokedex + 1)) + list(range(10001, max_num_with_special_pokemon + 1))):
            res = requests.get(
                'https://pokeapi.co/api/v2/pokemon-form/{0}'.format(e)).json()
            print(res)
            if e == max_num_with_special_pokemon:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


if __name__ == "__main__":
    fetch_pokemon_forms_data()
