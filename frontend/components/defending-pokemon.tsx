import { useState } from "react";
import { Ability } from "../models/ability";
import { DefendingPokemonStatus } from "../models/defending-pokemon-status";
import { EV } from "../models/ev";
import { IV } from "../models/iv";
import { Nature } from "../models/nature";
import { Pokemon } from "../models/pokemon";
import { StatsRank } from "../models/stats-rank";
import { StatusAilment } from "../models/status-ailment";
import { TeraType } from "../models/tera-type";

type Props = {
  defendingPokemonStatus: DefendingPokemonStatus;
  onUpdate: (defendingPokemonStatus: DefendingPokemonStatus) => void;
};

const DefendingPokemon: React.FC<Props> = ({
  defendingPokemonStatus,
  onUpdate,
}) => {
  const [showPokemonModal, setShowPokemonModal] = useState(false);

  const [pokemonList, setPokemonList] = useState(
    Pokemon.listAllValidSVPokemons()
  );

  const onNameFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPokemonModal(true);
  };

  const onLevelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      parseInt(e.target.value),
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onHpIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      new IV(
        parseInt(e.target.value),
        defendingPokemonStatus.iv.attack,
        defendingPokemonStatus.iv.defense,
        defendingPokemonStatus.iv.spAtk,
        defendingPokemonStatus.iv.spDef,
        defendingPokemonStatus.iv.speed
      ),
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onHpEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        parseInt(e.target.value),
        defendingPokemonStatus.ev.attack,
        defendingPokemonStatus.ev.defense,
        defendingPokemonStatus.ev.spAtk,
        defendingPokemonStatus.ev.spDef,
        defendingPokemonStatus.ev.speed
      ),
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onDefenseIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      new IV(
        defendingPokemonStatus.iv.hp,
        defendingPokemonStatus.iv.attack,
        parseInt(e.target.value),
        defendingPokemonStatus.iv.spAtk,
        defendingPokemonStatus.iv.spDef,
        defendingPokemonStatus.iv.speed
      ),
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onDefenseEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        defendingPokemonStatus.ev.hp,
        defendingPokemonStatus.ev.attack,
        parseInt(e.target.value),
        defendingPokemonStatus.ev.spAtk,
        defendingPokemonStatus.ev.spDef,
        defendingPokemonStatus.ev.speed
      ),
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onDefenseNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newDefenseNature: number
  ) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      new Nature(
        defendingPokemonStatus.nature.attack,
        newDefenseNature,
        defendingPokemonStatus.nature.spAtk,
        defendingPokemonStatus.nature.spDef,
        defendingPokemonStatus.nature.speed
      ),
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onDefenseRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      new StatsRank(
        defendingPokemonStatus.statsRank.attack,
        parseInt(e.target.value),
        defendingPokemonStatus.statsRank.spAtk,
        defendingPokemonStatus.statsRank.spDef,
        defendingPokemonStatus.statsRank.speed
      ),
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onTeraTypeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      new TeraType(parseInt(e.target.value)),
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAbilityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      new Ability(parseInt(e.target.value)),
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      parseInt(e.target.value),
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onStatusAilmentUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // defendingPokemonStatus.id,
      // defendingPokemonStatus.nameJp,
      // defendingPokemonStatus.nameEn,
      // defendingPokemonStatus.type1,
      // defendingPokemonStatus.type2,
      // defendingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      new StatusAilment(parseInt(e.target.value))
    );
    onUpdate(newValue);
  };

  const onSelectPokemonUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      new StatusAilment(parseInt(e.target.value))
    );
    onUpdate(newValue);
  };

  const onSelectPokemonSubmit = (newPokemon: Pokemon) => {
    // TODO
    const newValue = new DefendingPokemonStatus(
      newPokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);

    setShowPokemonModal(false);
  };

  const stats = defendingPokemonStatus.calculateStats();

  return (
    <>
      <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            防御側
          </h5>
        </div>
        <form className="space-y-8">
          <div className="space-y-1">
            <div>
              <label htmlFor="defending_pokemon_name" className="text-sm">
                防御側ポケモン
              </label>
              <input
                type="text"
                id="defending_pokemon_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onNameFocus}
                value={defendingPokemonStatus.pokemon.nameJp}
              ></input>
              <div className="flex space-x-1 text-xs">
                <span>タイプ</span>
                <span>{defendingPokemonStatus.pokemon.type1.nameJp}</span>
                {defendingPokemonStatus.pokemon.type2 === null ? null : (
                  <span>{defendingPokemonStatus.pokemon.type2.nameJp}</span>
                )}
              </div>
              <div className="flex space-x-1 text-xs">
                <span>種族値</span>
                <span>
                  H{defendingPokemonStatus.pokemon.baseStats.hp.toString()}
                </span>
                <span>
                  A{defendingPokemonStatus.pokemon.baseStats.attack.toString()}
                </span>
                <span>
                  B{defendingPokemonStatus.pokemon.baseStats.defense.toString()}
                </span>
                <span>
                  C{defendingPokemonStatus.pokemon.baseStats.spAtk.toString()}
                </span>
                <span>
                  D{defendingPokemonStatus.pokemon.baseStats.spDef.toString()}
                </span>
                <span>
                  S{defendingPokemonStatus.pokemon.baseStats.speed.toString()}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="defending_pokemon_level" className="text-sm">
                レベル
              </label>
              <input
                type="number"
                id="defending_pokemon_level"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onLevelUpdate}
                value={defendingPokemonStatus.level.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_hp_iv" className="text-sm">
                HP個体値
              </label>
              <input
                type="number"
                id="defending_pokemon_hp_iv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onHpIVUpdate}
                value={defendingPokemonStatus.iv.hp.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_hp_ev" className="text-sm">
                HP努力値
              </label>
              <input
                type="number"
                id="defending_pokemon_hp_ev"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onHpEVUpdate}
                value={defendingPokemonStatus.ev.hp.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_defence_iv" className="text-sm">
                防御個体値
              </label>
              <input
                type="number"
                id="defending_pokemon_defence_iv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onDefenseIVUpdate}
                value={defendingPokemonStatus.iv.defense.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_defense_ev" className="text-sm">
                防御努力値
              </label>
              <input
                type="number"
                id="defending_pokemon_defense_ev"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onDefenseEVUpdate}
                value={defendingPokemonStatus.ev.defense.toString()}
              ></input>
            </div>
            <div>
              <label className="text-sm">防御性格補正</label>
              <div className="flex">
                <button
                  type="button"
                  className={
                    defendingPokemonStatus.nature.defense === 0.9
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onDefenseNatureUpdate(event, 0.9)}
                >
                  0.9
                </button>
                <button
                  type="button"
                  className={
                    defendingPokemonStatus.nature.defense === 1.0
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onDefenseNatureUpdate(event, 1.0)}
                >
                  1.0
                </button>
                <button
                  type="button"
                  className={
                    defendingPokemonStatus.nature.defense === 1.1
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onDefenseNatureUpdate(event, 1.1)}
                >
                  1.1
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm">実数値（補正前）</label>
              <div className="flex space-x-1 text-xs">
                <span>H{stats.hp}</span>
                <span>A{stats.attack}</span>
                <span>B{stats.defense}</span>
                <span>C{stats.spAtk}</span>
                <span>D{stats.spDef}</span>
                <span>S{stats.speed}</span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <label
                htmlFor="defending_pokemon_defense_rank"
                className="text-sm"
              >
                防御ランク
              </label>
              <input
                type="number"
                id="defending_pokemon_defense_rank"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onDefenseRankUpdate}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_tera_type" className="text-sm">
                テラスタイプ
              </label>
              <input
                type="text"
                id="defending_pokemon_tera_type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onTeraTypeUpdate}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_ability" className="text-sm">
                特性
              </label>
              <input
                type="text"
                id="defending_pokemon_ability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onAbilityUpdate}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_tool" className="text-sm">
                道具
              </label>
              <input
                type="text"
                id="defending_pokemon_tool"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onItemUpdate}
              ></input>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <label
                htmlFor="defending_pokemon_status_ailment"
                className="text-sm"
              >
                状態異常
              </label>
              <input
                type="text"
                id="defending_pokemon_status_ailment"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onStatusAilmentUpdate}
              ></input>
            </div>
          </div>
        </form>
      </section>

      {showPokemonModal ? (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowPokemonModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex flex-col">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <form>
                      <input
                        type="text"
                        id="attacking_pokemon_select_pokemon"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={onSelectPokemonUpdate}
                        placeholder="ポケモン名を入力"
                      ></input>
                    </form>
                  </div>
                  <div className="mt-2 text-left">
                    <ul>
                      {pokemonList.map((e) => (
                        <li
                          key={e.id}
                          onClick={(event) => onSelectPokemonSubmit(e)}
                        >
                          {e.nameJp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DefendingPokemon;
