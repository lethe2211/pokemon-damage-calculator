import { useState } from "react";
import { Ability } from "../models/ability";
import { AttackingPokemonStatus } from "../models/attacking-pokemon-status";
import { DefendingPokemonStatus } from "../models/defending-pokemon-status";
import { EV } from "../models/ev";
import { Item } from "../models/item";
import { IV } from "../models/iv";
import { MoveCategory } from "../models/move";
import { Nature } from "../models/nature";
import { Pokemon } from "../models/pokemon";
import { StatsRank } from "../models/stats-rank";
import { StatusAilment } from "../models/status-ailment";
import { TeraType } from "../models/tera-type";
import { Type } from "../models/type";

type Props = {
  attackingPokemonStatus: AttackingPokemonStatus;
  defendingPokemonStatus: DefendingPokemonStatus;
  onUpdate: (defendingPokemonStatus: DefendingPokemonStatus) => void;
};

const DefendingPokemon: React.FC<Props> = ({
  attackingPokemonStatus,
  defendingPokemonStatus,
  onUpdate,
}) => {
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showAbilityModal, setShowAbilityModal] = useState(false);
  const [expandStats, setExpandStats] = useState(false);
  const [expandRank, setExpandRank] = useState(false);

  const [pokemonList, setPokemonList] = useState(
    Pokemon.listAllValidSVPokemons()
  );
  const [abilityList, setAbilityList] = useState(
    Ability.listAllValidSVAbilities()
  );

  const onNameFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPokemonModal(true);
  };

  const onLevelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
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

  const onAttackIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      new IV(
        defendingPokemonStatus.iv.hp,
        parseInt(e.target.value),
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

  const onAttackEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        defendingPokemonStatus.ev.hp,
        parseInt(e.target.value),
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

  const onAttackNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newAttackNature: number
  ) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      new Nature(
        newAttackNature,
        defendingPokemonStatus.nature.defense,
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

  const onDefenseIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
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

  const onSpAtkIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      new IV(
        defendingPokemonStatus.iv.hp,
        defendingPokemonStatus.iv.attack,
        defendingPokemonStatus.iv.defense,
        parseInt(e.target.value),
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

  const onSpAtkEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        defendingPokemonStatus.ev.hp,
        defendingPokemonStatus.ev.attack,
        defendingPokemonStatus.ev.defense,
        parseInt(e.target.value),
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

  const onSpAtkNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpAtkNature: number
  ) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      new Nature(
        defendingPokemonStatus.nature.attack,
        defendingPokemonStatus.nature.defense,
        newSpAtkNature,
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

  const onSpDefIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      new IV(
        defendingPokemonStatus.iv.hp,
        defendingPokemonStatus.iv.attack,
        defendingPokemonStatus.iv.defense,
        defendingPokemonStatus.iv.spAtk,
        parseInt(e.target.value),
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

  const onSpDefEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        defendingPokemonStatus.ev.hp,
        defendingPokemonStatus.ev.attack,
        defendingPokemonStatus.ev.defense,
        defendingPokemonStatus.ev.spAtk,
        parseInt(e.target.value),
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

  const onSpDefNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpDefNature: number
  ) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      new Nature(
        defendingPokemonStatus.nature.attack,
        defendingPokemonStatus.nature.defense,
        defendingPokemonStatus.nature.spAtk,
        newSpDefNature,
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

  const onSpeedIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      new IV(
        defendingPokemonStatus.iv.hp,
        defendingPokemonStatus.iv.attack,
        defendingPokemonStatus.iv.defense,
        defendingPokemonStatus.iv.spAtk,
        defendingPokemonStatus.iv.spDef,
        parseInt(e.target.value)
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

  const onSpeedEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      new EV(
        defendingPokemonStatus.ev.hp,
        defendingPokemonStatus.ev.attack,
        defendingPokemonStatus.ev.defense,
        defendingPokemonStatus.ev.spAtk,
        defendingPokemonStatus.ev.spDef,
        parseInt(e.target.value)
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

  const onSpeedNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpeedNature: number
  ) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      new Nature(
        defendingPokemonStatus.nature.attack,
        defendingPokemonStatus.nature.defense,
        defendingPokemonStatus.nature.spAtk,
        defendingPokemonStatus.nature.spDef,
        newSpeedNature
      ),
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onAttackRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      new StatsRank(
        parseInt(e.target.value),
        defendingPokemonStatus.statsRank.defense,
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

  const onDefenseRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
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

  const onSpAtkRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      new StatsRank(
        defendingPokemonStatus.statsRank.attack,
        defendingPokemonStatus.statsRank.defense,
        parseInt(e.target.value),
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

  const onSpDefRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      new StatsRank(
        defendingPokemonStatus.statsRank.attack,
        defendingPokemonStatus.statsRank.defense,
        defendingPokemonStatus.statsRank.spAtk,
        parseInt(e.target.value),
        defendingPokemonStatus.statsRank.speed
      ),
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onSpeedRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      new StatsRank(
        defendingPokemonStatus.statsRank.attack,
        defendingPokemonStatus.statsRank.defense,
        defendingPokemonStatus.statsRank.spAtk,
        defendingPokemonStatus.statsRank.spDef,
        parseInt(e.target.value)
      ),
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      defendingPokemonStatus.item,
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onTeraTypeUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
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

  const onAbilityFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowAbilityModal(true);
  };

  const onItemUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      defendingPokemonStatus.ability,
      new Item(parseInt(e.target.value)),
      defendingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onStatusAilmentUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
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

  const onExpandStatsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpandStats(!expandStats);
  };

  const onExpandRankClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpandRank(!expandRank);
  };

  const onSelectAbilityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO
  };

  const onSelectAbilitySubmit = (newAbility: Ability) => {
    const newValue = new DefendingPokemonStatus(
      defendingPokemonStatus.pokemon,
      defendingPokemonStatus.level,
      defendingPokemonStatus.iv,
      defendingPokemonStatus.ev,
      defendingPokemonStatus.nature,
      defendingPokemonStatus.statsRank,
      defendingPokemonStatus.teraType,
      newAbility,
      defendingPokemonStatus.item,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);

    setShowAbilityModal(false);
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
          <div className="space-y-2">
            <div>
              <label htmlFor="defending_pokemon_name" className="text-sm">
                防御側ポケモン
              </label>
              <input
                type="text"
                readOnly
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
            <div className="space-y-2">
              {expandStats ||
              attackingPokemonStatus.move.category.equals(
                MoveCategory.fromNameEn("Physical")
              ) ||
              attackingPokemonStatus.move.category.equals(
                MoveCategory.fromNameEn("Special")
              ) ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      HP
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_hp_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_hp_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onHpIVUpdate}
                      value={defendingPokemonStatus.iv.hp.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_hp_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_hp_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onHpEVUpdate}
                      value={defendingPokemonStatus.ev.hp.toString()}
                    ></input>
                  </div>
                </div>
              ) : null}
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      攻撃
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_attack_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_attack_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackIVUpdate}
                      value={defendingPokemonStatus.iv.attack.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_attack_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_attack_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackEVUpdate}
                      value={defendingPokemonStatus.ev.attack.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.attack === 0.9
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onAttackNatureUpdate(event, 0.9)}
                      >
                        0.9
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.attack === 1.0
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onAttackNatureUpdate(event, 1.0)}
                      >
                        1.0
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.attack === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onAttackNatureUpdate(event, 1.1)}
                      >
                        1.1
                      </button>
                    </span>
                  </div>
                </div>
              ) : null}
              {expandStats ||
              attackingPokemonStatus.move.category.equals(
                MoveCategory.fromNameEn("Physical")
              ) ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      防御
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_defence_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_defence_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseIVUpdate}
                      value={defendingPokemonStatus.iv.defense.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_defense_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_defense_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseEVUpdate}
                      value={defendingPokemonStatus.ev.defense.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <div className="flex">
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.defense === 0.9
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onDefenseNatureUpdate(event, 0.9)}
                      >
                        0.9
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.defense === 1.0
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onDefenseNatureUpdate(event, 1.0)}
                      >
                        1.0
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.defense === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onDefenseNatureUpdate(event, 1.1)}
                      >
                        1.1
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      特攻
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_sp_atk_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_atk_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkIVUpdate}
                      value={defendingPokemonStatus.iv.spAtk.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_sp_atk_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_atk_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkEVUpdate}
                      value={defendingPokemonStatus.ev.spAtk.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spAtk === 0.9
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpAtkNatureUpdate(event, 0.9)}
                      >
                        0.9
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spAtk === 1.0
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpAtkNatureUpdate(event, 1.0)}
                      >
                        1.0
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spAtk === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpAtkNatureUpdate(event, 1.1)}
                      >
                        1.1
                      </button>
                    </span>
                  </div>
                </div>
              ) : null}
              {expandStats ||
              attackingPokemonStatus.move.category.equals(
                MoveCategory.fromNameEn("Special")
              ) ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      特防
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_sp_def_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_def_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefIVUpdate}
                      value={defendingPokemonStatus.iv.spDef.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_def_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_def_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefEVUpdate}
                      value={defendingPokemonStatus.ev.spDef.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spDef === 0.9
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpDefNatureUpdate(event, 0.9)}
                      >
                        0.9
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spDef === 1.0
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpDefNatureUpdate(event, 1.0)}
                      >
                        1.0
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.spDef === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpDefNatureUpdate(event, 1.1)}
                      >
                        1.1
                      </button>
                    </span>
                  </div>
                </div>
              ) : null}
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      素早さ
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_speed_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_speed_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedIVUpdate}
                      value={defendingPokemonStatus.iv.speed.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_speed_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_speed_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedEVUpdate}
                      value={defendingPokemonStatus.ev.speed.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.speed === 0.9
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpeedNatureUpdate(event, 0.9)}
                      >
                        0.9
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.speed === 1.0
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpeedNatureUpdate(event, 1.0)}
                      >
                        1.0
                      </button>
                      <button
                        type="button"
                        className={
                          defendingPokemonStatus.nature.speed === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onSpeedNatureUpdate(event, 1.1)}
                      >
                        1.1
                      </button>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-row-reverse">
              <button
                type="button"
                id="expand_stats"
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
                onClick={onExpandStatsClick}
              >
                {expandStats ? "隠す" : "他の能力値を変更する"}
              </button>
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
            <div className="space-y-2">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h6 className="text-sm font-bold leading-none text-gray-900">
                    ランク
                  </h6>
                </div>
                {expandRank ||
                attackingPokemonStatus.move.category.equals(
                  MoveCategory.fromNameEn("Physical")
                ) ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_attack_rank"
                      className="text-sm"
                    >
                      攻撃
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_attack_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackRankUpdate}
                      value={defendingPokemonStatus.statsRank.attack.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_defense_rank"
                      className="text-sm"
                    >
                      防御
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_defense_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseRankUpdate}
                      value={defendingPokemonStatus.statsRank.defense.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ||
                attackingPokemonStatus.move.category.equals(
                  MoveCategory.fromNameEn("Special")
                ) ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_sp_atk_rank"
                      className="text-sm"
                    >
                      特攻
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_atk_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkRankUpdate}
                      value={defendingPokemonStatus.statsRank.spAtk.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_sp_def_rank"
                      className="text-sm"
                    >
                      特防
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_sp_def_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefRankUpdate}
                      value={defendingPokemonStatus.statsRank.spDef.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="defending_pokemon_attack_rank"
                      className="text-sm"
                    >
                      素早さ
                    </label>
                    <input
                      type="number"
                      id="defending_pokemon_speed_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedRankUpdate}
                      value={defendingPokemonStatus.statsRank.speed.toString()}
                    ></input>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-row-reverse">
                <button
                  type="button"
                  id="expand_stats"
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
                  onClick={onExpandRankClick}
                >
                  {expandRank ? "隠す" : "他のランクを変更する"}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="defending_pokemon_tera_type" className="text-sm">
                テラスタイプ
              </label>
              <select
                id="defending_pokemon_tera_type"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onTeraTypeUpdate}
                defaultValue={"0"}
              >
                <option value="0">無効</option>
                {Type.listAllTypes().map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nameJp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="defending_pokemon_ability" className="text-sm">
                特性
              </label>
              <input
                type="text"
                id="defending_pokemon_ability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onAbilityFocus}
                defaultValue={defendingPokemonStatus.ability.nameJp}
              ></input>
            </div>
            <div>
              <label htmlFor="defending_pokemon_tool" className="text-sm">
                道具
              </label>
              <select
                id="defending_pokemon_tool"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onItemUpdate}
                defaultValue={"0"}
              >
                {Item.listAllValidItemsForDefender().map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nameJp}
                  </option>
                ))}
              </select>
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

              <select
                id="defending_pokemon_status_ailment"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onStatusAilmentUpdate}
                defaultValue={"0"}
              >
                {StatusAilment.listAllTypes().map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nameJp}
                  </option>
                ))}
              </select>
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

      {showAbilityModal ? (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowAbilityModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex flex-col">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <form>
                      <input
                        type="text"
                        id="defending_pokemon_select_pokemon"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={onSelectAbilityUpdate}
                        placeholder="特性を入力"
                      ></input>
                    </form>
                  </div>
                  <div className="mt-2 text-left">
                    <ul>
                      {abilityList.map((e) => (
                        <li
                          key={e.id}
                          onClick={(event) => onSelectAbilitySubmit(e)}
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
