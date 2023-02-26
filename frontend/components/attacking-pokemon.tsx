import { useState } from "react";
import { Ability } from "../models/ability";
import { AttackingPokemonStatus } from "../models/attacking-pokemon-status";
import { EV } from "../models/ev";
import { IV } from "../models/iv";
import { Move } from "../models/move";
import { Nature } from "../models/nature";
import { Pokemon } from "../models/pokemon";
import { StatsRank } from "../models/stats-rank";
import { StatusAilment } from "../models/status-ailment";
import { TeraType } from "../models/tera-type";

type Props = {
  attackingPokemonStatus: AttackingPokemonStatus;
  onUpdate: (attackingPokemonStatus: AttackingPokemonStatus) => void;
};

const AttackingPokemon: React.FC<Props> = ({
  attackingPokemonStatus,
  onUpdate,
}) => {
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const [pokemonList, setPokemonList] = useState(Pokemon.listAllValidSVPokemons())
  const [moveList, setMoveList] = useState(Move.listAllValidSVMoves());

  const onNameFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPokemonModal(true);

    // const newValue = new AttackingPokemonStatus(
    //   150,
    //   "ミュウ",
    //   "Mew",
    //   new Type(14),
    //   null,
    //   {
    //     hp: 91,
    //     attack: 134,
    //     defense: 95,
    //     spAtk: 100,
    //     spDef: 100,
    //     speed: 80,
    //   },
    //   50,
    //   {
    //     hp: 31,
    //     attack: 31,
    //     defense: 31,
    //     spAtk: 31,
    //     spDef: 31,
    //     speed: 31,
    //   },
    //   {
    //     hp: 252,
    //     attack: 252,
    //     defense: 0,
    //     spAtk: 0,
    //     spDef: 0,
    //     speed: 4,
    //   },
    //   {
    //     attack: 1.0,
    //     defense: 1.0,
    //     spAtk: 1.0,
    //     spDef: 1.0,
    //     speed: 1.0,
    //   },
    //   {
    //     attack: 0,
    //     defense: 0,
    //     spAtk: 0,
    //     spDef: 0,
    //     speed: 0,
    //   },
    //   new Move(1),
    //   {
    //     id: 1,
    //   },
    //   {
    //     id: 1,
    //   },
    //   {
    //     id: 1,
    //   },
    //   false,
    //   {
    //     id: 0,
    //   }
    // );
    // onUpdate(newValue);
  };

  const onLevelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      parseInt(e.target.value),
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAttackIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      new IV(
        attackingPokemonStatus.iv.hp,
        parseInt(e.target.value),
        attackingPokemonStatus.iv.defense,
        attackingPokemonStatus.iv.spAtk,
        attackingPokemonStatus.iv.spDef,
        attackingPokemonStatus.iv.speed
      ),
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAttackEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.iv.hp,
        parseInt(e.target.value),
        attackingPokemonStatus.iv.defense,
        attackingPokemonStatus.iv.spAtk,
        attackingPokemonStatus.iv.spDef,
        attackingPokemonStatus.iv.speed
      ),
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAttackNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newAttackNature: number
  ) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      new Nature(
        newAttackNature,
        attackingPokemonStatus.nature.defense,
        attackingPokemonStatus.nature.spAtk,
        attackingPokemonStatus.nature.spDef,
        attackingPokemonStatus.nature.speed
      ),
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAttackRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      new StatsRank(
        parseInt(e.target.value),
        attackingPokemonStatus.statsRank.defense,
        attackingPokemonStatus.statsRank.spAtk,
        attackingPokemonStatus.statsRank.spDef,
        attackingPokemonStatus.statsRank.speed
      ),
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onMoveFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowMoveModal(true);
  };

  const onTeraTypeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      new TeraType(parseInt(e.target.value)),
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAbilityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      new Ability(parseInt(e.target.value)),
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onItemUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onIsCriticalUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onStatusAilmentUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      new StatusAilment(parseInt(e.target.value))
    );
    onUpdate(newValue);
  };

  const onSelectPokemonUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      new StatusAilment(parseInt(e.target.value))
    );
    onUpdate(newValue);
  };

  const onSelectPokemonSubmit = (newPokemon: Pokemon) => {
    // TODO
    const newValue = new AttackingPokemonStatus(
      newPokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);

    setShowPokemonModal(false);
  };

  const onSelectMoveUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO
  };

  const onSelectMoveSubmit = (newMove: Move) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      // attackingPokemonStatus.id,
      // attackingPokemonStatus.nameJp,
      // attackingPokemonStatus.nameEn,
      // attackingPokemonStatus.type1,
      // attackingPokemonStatus.type2,
      // attackingPokemonStatus.baseStats,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      newMove,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);

    setShowMoveModal(false);
  };

  const stats = attackingPokemonStatus.calculateStats();

  return (
    <>
      <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            攻撃側
          </h5>
        </div>
        <form className="space-y-8">
          <div className="space-y-1">
            <div>
              <label htmlFor="attacking_pokemon_name" className="text-sm">
                攻撃側ポケモン
              </label>
              <input
                type="text"
                id="attacking_pokemon_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onNameFocus}
                value={attackingPokemonStatus.pokemon.nameJp}
              ></input>
              <div className="flex space-x-1 text-xs">
                <span>タイプ</span>
                <span>{attackingPokemonStatus.pokemon.type1.nameJp}</span>
                {attackingPokemonStatus.pokemon.type2 === null ? null : (
                  <span>{attackingPokemonStatus.pokemon.type2.nameJp}</span>
                )}
              </div>
              <div className="flex space-x-1 text-xs">
                <span>種族値</span>
                <span>H{attackingPokemonStatus.pokemon.baseStats.hp.toString()}</span>
                <span>
                  A{attackingPokemonStatus.pokemon.baseStats.attack.toString()}
                </span>
                <span>
                  B{attackingPokemonStatus.pokemon.baseStats.defense.toString()}
                </span>
                <span>
                  C{attackingPokemonStatus.pokemon.baseStats.spAtk.toString()}
                </span>
                <span>
                  D{attackingPokemonStatus.pokemon.baseStats.spDef.toString()}
                </span>
                <span>
                  S{attackingPokemonStatus.pokemon.baseStats.speed.toString()}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_level" className="text-sm">
                レベル
              </label>
              <input
                type="number"
                id="attacking_pokemon_level"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onLevelUpdate}
                value={attackingPokemonStatus.level.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_attack_iv" className="text-sm">
                攻撃個体値
              </label>
              <input
                type="number"
                id="attacking_pokemon_attack_iv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onAttackIVUpdate}
                value={attackingPokemonStatus.iv.attack.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_attack_ev" className="text-sm">
                攻撃努力値
              </label>
              <input
                type="number"
                id="attacking_pokemon_attack_ev"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onAttackEVUpdate}
                value={attackingPokemonStatus.ev.attack.toString()}
              ></input>
            </div>
            <div>
              <label className="text-sm">攻撃性格補正</label>
              <div className="flex">
                <button
                  type="button"
                  className={
                    attackingPokemonStatus.nature.attack === 0.9
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onAttackNatureUpdate(event, 0.9)}
                >
                  0.9
                </button>
                <button
                  type="button"
                  className={
                    attackingPokemonStatus.nature.attack === 1.0
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onAttackNatureUpdate(event, 1.0)}
                >
                  1.0
                </button>
                <button
                  type="button"
                  className={
                    attackingPokemonStatus.nature.attack === 1.1
                      ? "bg-blue-800 hover:bg-blue-900 text-white py-1 px-4 rounded-l"
                      : "bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-l"
                  }
                  onClick={(event) => onAttackNatureUpdate(event, 1.1)}
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
              <label className="text-sm">攻撃ランク</label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onAttackRankUpdate}
                value={attackingPokemonStatus.statsRank.attack.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_move" className="text-sm">
                技
              </label>
              <input
                type="text"
                id="attacking_pokemon_move"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onMoveFocus}
                defaultValue={attackingPokemonStatus.move.nameJp.toString()}
              ></input>
              <div className="flex space-x-1 text-xs">
                <span>{attackingPokemonStatus.move.type.nameJp}</span>
                <span>威力{attackingPokemonStatus.move.power}</span>
                <span>PP{attackingPokemonStatus.move.pp}</span>
              </div>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_tera_type" className="text-sm">
                テラスタイプ
              </label>
              <input
                type="text"
                id="attacking_pokemon_tera_type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onTeraTypeUpdate}
                value={attackingPokemonStatus.teraType.id.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_ability" className="text-sm">
                特性
              </label>
              <input
                type="text"
                id="attacking_pokemon_ability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onAbilityUpdate}
                value={attackingPokemonStatus.ability.id.toString()}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_item" className="text-sm">
                道具
              </label>
              <input
                type="text"
                id="attacking_pokemon_item"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onItemUpdate}
              ></input>
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <label
                htmlFor="attacking_pokemon_is_critical"
                className="text-sm"
              >
                急所
              </label>
              <input
                type="checkbox"
                id="attacking_pokemon_is_critical"
                className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                onChange={onIsCriticalUpdate}
              ></input>
            </div>
            <div>
              <label
                htmlFor="attacking_pokemon_status_ailment"
                className="text-sm"
              >
                状態異常
              </label>
              <input
                type="text"
                id="attacking_pokemon_status_ailment"
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

      {showMoveModal ? (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowMoveModal(false)}
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
                        onChange={onSelectMoveUpdate}
                        placeholder="技名を入力"
                      ></input>
                    </form>
                  </div>
                  <div className="mt-2 text-left">
                    <ul>
                      {moveList.map((e) => (
                        <li
                          key={e.id}
                          onClick={(event) => onSelectMoveSubmit(e)}
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

export default AttackingPokemon;
