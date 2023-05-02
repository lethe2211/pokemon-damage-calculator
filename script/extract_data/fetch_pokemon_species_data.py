import os
import time
import json

import requests


def fetch_pokemon_species_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('output/pokemon_species_data_orig.json'):
        print('Stop processing')
        return

    with open('output/pokemon_species_data_orig.json', 'w') as file:
        file.write('[\n')

        max_num_in_pokedex = 1010
        for i in range(1, max_num_in_pokedex + 1):
            res = requests.get(
                'https://pokeapi.co/api/v2/pokemon-species/{0}'.format(i)).json()
            print(res)
            if i == max_num_in_pokedex:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


if __name__ == "__main__":
    fetch_pokemon_species_data()
