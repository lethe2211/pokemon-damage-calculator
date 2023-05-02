import os
import time
import json

import requests


def fetch_move_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('output/move_data_orig.json'):
        print('Stop processing')
        return

    with open('output/move_data_orig.json', 'w') as file:
        file.write('[\n')

        max_num = 901
        max_num_with_special_moves = 10018
        for e in list(range(1, max_num + 1)) + list(range(10001, max_num_with_special_moves + 1)):
            res = requests.get(
                'https://pokeapi.co/api/v2/move/{0}'.format(e)).json()
            print(res)
            if e == max_num_with_special_moves:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')

    # TODO: Fetch Poke-Tetsu move data


if __name__ == "__main__":
    fetch_move_data()
