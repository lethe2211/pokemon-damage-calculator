import os
import json


def convert_pokemon_data():
    # Safeguard. Please delete this block when you run this script
    if os.path.isfile('../../frontend/data/pokemon_data_sv.json'):
        print('Stop processing')
        return

    with open('output/pokemon_data_orig.json', 'r') as pokemon_data:
        with open('output/pokemon_species_data_orig.json', 'r') as pokemon_species_data:
            with open('output/pokemon_forms_data_orig.json', 'r') as pokemon_forms_data:
                with open('output/evolution_chain_data_orig.json', 'r') as evolution_chain_data:
                    pokemon_data_json = json.loads(pokemon_data.read())
                    pokemon_species_data_json = json.loads(
                        pokemon_species_data.read())
                    pokemon_forms_data_json = json.loads(
                        pokemon_forms_data.read())
                    evolution_chain_data_json = json.loads(
                        evolution_chain_data.read())

                    output = []
                    pokemon_names = set()
                    duplicated_pokemon_names = set()  # Remove duplications

                    for e in pokemon_data_json:
                        pokemon_id = e['id']

                        species_id = int(e['species']['url'].split('/')[-2])
                        print(species_id)

                        form_ids = [int(i['url'].split('/')[-2])
                                    for i in e['forms']]
                        print(form_ids)

                        for f in pokemon_species_data_json:
                            if f['id'] == species_id:
                                # Some of the pokemon species in Poke API do not have name_jp yet
                                if species_id == 1009:
                                    name_en = 'Walking Wake'
                                    name_jp = 'ウネルミナモ'
                                elif species_id == 1010:
                                    name_en = 'Iron Leaves'
                                    name_jp = 'テツノイサハ'
                                else:
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

                        # Pokemons that are not in SV := Pokemons that have no valid moves in SV,
                        # Plus, remove forms that are not useful for battle
                        sv = moves != [] or pokemon_id in [10143, ]

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
                                # Some of the pokemon species do not have name_jp yet
                                if species_id == 1009:
                                    name_en = 'Walking Wake'
                                    name_jp = 'ウネルミナモ'
                                elif species_id == 1010:
                                    name_en = 'Iron Leaves'
                                    name_jp = 'テツノイサハ'
                                else:
                                    name_en = [x['name'] for x in f['names']
                                               if x['language']['name'] == 'en'][0]
                                    name_jp = [x['name'] for x in f['names']
                                               if x['language']['name'] == 'ja'][0]

                        if name_en in duplicated_pokemon_names:
                            # Regard the form that is at the beginning as the main form
                            target_form_data = [
                                x for x in pokemon_forms_data_json if x['id'] == form_ids[0]][0]

                            if target_form_data["name"] == "pikachu-original-cap":
                                name_en = "Pikachu (Original Cap)"
                                name_jp = "ピカチュウ（オリジナルキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-hoenn-cap":
                                name_en = "Pikachu (Hoenn Cap)"
                                name_jp = "ピカチュウ（ホウエンキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-sinnoh-cap":
                                name_en = "Pikachu (Sinnoh Cap)"
                                name_jp = "ピカチュウ（シンオウキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-unova-cap":
                                name_en = "Pikachu (Unova Cap)"
                                name_jp = "ピカチュウ（イッシュキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-kalos-cap":
                                name_en = "Pikachu (Kalos Cap)"
                                name_jp = "ピカチュウ（カロスキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-alola-cap":
                                name_en = "Pikachu (Alola Cap)"
                                name_jp = "ピカチュウ（アローラキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-partner-cap":
                                name_en = "Pikachu (Partner Cap)"
                                name_jp = "ピカチュウ（キミにきめたキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "pikachu-world-cap":
                                name_en = "Pikachu (World Cap)"
                                name_jp = "ピカチュウ（ワールドキャップ）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "tauros-paldea-combat-breed":
                                name_en = "Tauros (Fighting Paldea)"
                                name_jp = "ケンタロス（パルデアのすがた、かくとう）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "tauros-paldea-blaze-breed":
                                name_en = "Tauros (Fire Paldea)"
                                name_jp = "ケンタロス（パルデアのすがた、ほのお）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "tauros-paldea-aqua-breed":
                                name_en = "Tauros (Water Paldea)"
                                name_jp = "ケンタロス（パルデアのすがた、みず）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "raticate-totem-alola":
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
                            elif target_form_data["name"] == "mimikyu-disguised":
                                # Use this form as the main form
                                name_en = "Mimikyu"
                                name_jp = "ミミッキュ"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "mimikyu-busted":
                                name_en = "Mimikyu (Busted)"
                                name_jp = "ミミッキュ（ばれたすがた）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
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
                            elif target_form_data["name"] == "maushold-family-of-four":
                                # Use this form as the main form
                                name_en = "Maushold"
                                name_jp = "イッカネズミ"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "maushold-family-of-three":
                                name_en = "Maushold (Family of Three)"
                                name_jp = "イッカネズミ（３びきかぞく）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "koraidon-apex-build":
                                # Use this form as the main form
                                name_en = "Koraidon"
                                name_jp = "コライドン"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "koraidon-limited-build":
                                name_en = "Koraidon (Limited Build)"
                                name_jp = "コライドン（せいげんけいたい）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "koraidon-sprinting-build":
                                name_en = "Koraidon (Sprinting Build)"
                                name_jp = "コライドン（しっそうけいたい）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "koraidon-swimming-build":
                                name_en = "Koraidon (Swimming Build)"
                                name_jp = "コライドン（ゆうえいけいたい）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "koraidon-gliding-build":
                                name_en = "Koraidon (Gliding Build)"
                                name_jp = "コライドン（かっくうけいたい）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "miraidon-ultimate-mode":
                                # Use this form as the main form
                                name_en = "Miraidon (Ultimate Mode)"
                                name_jp = "ミライドン（コンプリートモード）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                            elif target_form_data["name"] == "miraidon-low-power-mode":
                                name_en = "Miraidon (Low-Power Mode)"
                                name_jp = "ミライドン（リミテッドモード）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "miraidon-drive-mode":
                                name_en = "Miraidon (Drive Mode)"
                                name_jp = "ミライドン（ドライブモード）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "miraidon-aquatic-mode":
                                name_en = "Miraidon (Aquatic Mode)"
                                name_jp = "ミライドン（フロートモード）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
                            elif target_form_data["name"] == "miraidon-glide-mode":
                                name_en = "Miraidon (Glide Mode)"
                                name_jp = "ミライドン（グライドモード）"
                                output[i]['name_en'] = name_en
                                output[i]['name_jp'] = name_jp
                                output[i]['sv'] = False
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

                    # Add moves that can be learned only when it was a basic (not evolved) pokemon
                    for i, e in enumerate(pokemon_data_json):
                        pokemon_id = e['id']
                        species_id = int(e['species']['url'].split('/')[-2])
                        # print('{0} {1}'.format(pokemon_id, species_id))

                        for f in pokemon_species_data_json:
                            if f['id'] == species_id:
                                evolution_chain_id = int(
                                    f['evolution_chain']['url'].split('/')[-2])
                                break
                        # print(evolution_chain_id)
                        for f in evolution_chain_data_json:
                            print(f)
                            if f['id'] == evolution_chain_id:
                                target_species_id = int(
                                    f['chain']['species']['url'].split('/')[-2])
                                break

                        for f in pokemon_species_data_json:
                            if f['id'] == target_species_id:
                                target_pokemon_id = int(
                                    f['varieties'][0]['pokemon']['url'].split('/')[-2])
                                break

                        if output[i]['sv'] and pokemon_id != target_pokemon_id:
                            print('Pokemon: {0} has a move that can be added'.format(
                                pokemon_id, target_pokemon_id))
                            output[i]['moves'] = sorted(output[i]['moves'] + [
                                x for x in output[target_pokemon_id-1]['moves'] if x not in output[i]['moves']])

                    with open('../../frontend/data/pokemon_data_sv.json', 'w') as file:
                        file.write(json.dumps(output, ensure_ascii=False))


if __name__ == "__main__":
    convert_pokemon_data()
