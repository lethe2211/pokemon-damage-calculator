import os
import time
import json

import requests


def fetch_item_data():
    # Safeguard. Please delete this block when you run this script
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


if __name__ == "__main__":
    fetch_item_data()
