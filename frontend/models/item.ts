import itemDataSv from "../data/item_data_sv.json";

export class Item {
  id: number;
  pokeApiID: number;
  nameEn: string;
  nameJp: string;
  descriptionEn: string;
  descriptionJp: string;

  constructor(id: number) {
    this.id = id;

    const data = itemDataSv.filter((e) => e["id"] === id)[0];

    this.pokeApiID = data.poke_api_id;
    this.nameEn = data.name_en;
    this.nameJp = data.name_jp;
    this.descriptionEn = data.description_en;
    this.descriptionJp = data.description_jp;
  }

  static listAllValidItemsForAttacker(): Item[] {
    return itemDataSv
      .filter((e) => e.valid_in_attacking_pokemon === true)
      .map((e) => new Item(e.id));
  }

  static listAllValidItemsForDefender(): Item[] {
    return itemDataSv
      .filter((e) => e.valid_in_defending_pokemon === true)
      .map((e) => new Item(e.id));
  }
}
