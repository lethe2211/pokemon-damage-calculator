import os
import time
import json

import requests


def fetch_ability_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('output/ability_data_orig.json'):
        print('Stop processing')
        return

    with open('output/ability_data_orig.json', 'w') as file:
        file.write('[\n')

        max_num = 298
        for e in list(range(1, max_num + 1)):
            res = requests.get(
                'https://pokeapi.co/api/v2/ability/{0}'.format(e)).json()
            print(res)
            if e == max_num:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + '\n')
            else:
                file.write('  ' + json.dumps(res, ensure_ascii=False) + ',\n')
            time.sleep(0.5)

        file.write(']\n')


if __name__ == "__main__":
    fetch_ability_data()
