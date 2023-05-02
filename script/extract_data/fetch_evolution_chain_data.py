import os
import time
import json

import requests


def fetch_evolution_chain_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('output/evolution_chain_data_orig.json'):
        print('Stop processing')
        return

    with open('output/evolution_chain_data_orig.json', 'w') as file:
        file.write('[\n')

        max_num = 538
        for e in list(range(1, 210)) + list(range(211, 222)) + list(range(223, max_num + 1)):
            res = requests.get(
                'https://pokeapi.co/api/v2/evolution-chain/{0}'.format(e))
            print(res.json())

            if res.status_code != 200:
                continue

            if e == max_num:
                file.write('  ' + json.dumps(res.json(),
                           ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res.json(),
                           ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


if __name__ == "__main__":
    fetch_evolution_chain_data()
