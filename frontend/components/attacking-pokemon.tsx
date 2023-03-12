import { useReducer, useState } from "react";
import { convertHiraganaToKatakana } from "../lib/util";
import { Ability } from "../models/ability";
import { AttackingPokemonStatus } from "../models/attacking-pokemon-status";
import { EV } from "../models/ev";
import { Item } from "../models/item";
import { IV } from "../models/iv";
import { Move, MoveCategory } from "../models/move";
import { Nature } from "../models/nature";
import { Pokemon } from "../models/pokemon";
import { StatsRank } from "../models/stats-rank";
import { StatusAilment } from "../models/status-ailment";
import { TeraType } from "../models/tera-type";
import { Type } from "../models/type";

type Props = {
  attackingPokemonStatus: AttackingPokemonStatus;
  onUpdate: (attackingPokemonStatus: AttackingPokemonStatus) => void;
};

const AttackingPokemon: React.FC<Props> = ({
  attackingPokemonStatus,
  onUpdate,
}) => {
  // TODO: Stop scrolling the main screen while the modal is open
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showAbilityModal, setShowAbilityModal] = useState(false);
  const [expandStats, setExpandStats] = useState(false);
  const [expandRank, setExpandRank] = useState(false);

  const [pokemonList, setPokemonList] = useState(
    Pokemon.listAllValidSVPokemons()
  );
  const [moveList, setMoveList] = useState(Move.listAllValidSVMoves());
  const [abilityList, setAbilityList] = useState(
    Ability.listAllValidSVAbilities()
  );

  const onNameFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowPokemonModal(true);
  };

  const onLevelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
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

  const onHpIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      new IV(
        parseInt(e.target.value),
        attackingPokemonStatus.iv.attack,
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

  const onHpEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        parseInt(e.target.value),
        attackingPokemonStatus.ev.attack,
        attackingPokemonStatus.ev.defense,
        attackingPokemonStatus.ev.spAtk,
        attackingPokemonStatus.ev.spDef,
        attackingPokemonStatus.ev.speed
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

  const onAttackIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
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
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.ev.hp,
        parseInt(e.target.value),
        attackingPokemonStatus.ev.defense,
        attackingPokemonStatus.ev.spAtk,
        attackingPokemonStatus.ev.spDef,
        attackingPokemonStatus.ev.speed
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

  const onDefenseIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      new IV(
        attackingPokemonStatus.iv.hp,
        attackingPokemonStatus.iv.attack,
        parseInt(e.target.value),
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

  const onDefenseEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.ev.hp,
        attackingPokemonStatus.ev.attack,
        parseInt(e.target.value),
        attackingPokemonStatus.ev.spAtk,
        attackingPokemonStatus.ev.spDef,
        attackingPokemonStatus.ev.speed
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

  const onDefenseNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newDefenseNature: number
  ) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      new Nature(
        attackingPokemonStatus.nature.attack,
        newDefenseNature,
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

  const onSpAtkIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      new IV(
        attackingPokemonStatus.iv.hp,
        attackingPokemonStatus.iv.attack,
        attackingPokemonStatus.iv.defense,
        parseInt(e.target.value),
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

  const onSpAtkEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.ev.hp,
        attackingPokemonStatus.ev.attack,
        attackingPokemonStatus.ev.defense,
        parseInt(e.target.value),
        attackingPokemonStatus.ev.spDef,
        attackingPokemonStatus.ev.speed
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

  const onSpAtkNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpAtkNature: number
  ) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      new Nature(
        attackingPokemonStatus.nature.attack,
        attackingPokemonStatus.nature.defense,
        newSpAtkNature,
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

  const onSpDefIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      new IV(
        attackingPokemonStatus.iv.hp,
        attackingPokemonStatus.iv.attack,
        attackingPokemonStatus.iv.defense,
        attackingPokemonStatus.iv.spAtk,
        parseInt(e.target.value),
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

  const onSpDefEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.ev.hp,
        attackingPokemonStatus.ev.attack,
        attackingPokemonStatus.ev.defense,
        attackingPokemonStatus.ev.spAtk,
        parseInt(e.target.value),
        attackingPokemonStatus.ev.speed
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

  const onSpDefNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpDefNature: number
  ) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      new Nature(
        attackingPokemonStatus.nature.attack,
        attackingPokemonStatus.nature.defense,
        attackingPokemonStatus.nature.spAtk,
        newSpDefNature,
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

  const onSpeedIVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      new IV(
        attackingPokemonStatus.iv.hp,
        attackingPokemonStatus.iv.attack,
        attackingPokemonStatus.iv.defense,
        attackingPokemonStatus.iv.spAtk,
        attackingPokemonStatus.iv.spDef,
        parseInt(e.target.value)
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

  const onSpeedEVUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      new EV(
        attackingPokemonStatus.ev.hp,
        attackingPokemonStatus.ev.attack,
        attackingPokemonStatus.ev.defense,
        attackingPokemonStatus.ev.spAtk,
        attackingPokemonStatus.ev.spDef,
        parseInt(e.target.value)
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

  const onSpeedNatureUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    newSpeedNature: number
  ) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      new Nature(
        attackingPokemonStatus.nature.attack,
        attackingPokemonStatus.nature.defense,
        attackingPokemonStatus.nature.spAtk,
        attackingPokemonStatus.nature.spDef,
        newSpeedNature
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

  const onDefenseRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      new StatsRank(
        attackingPokemonStatus.statsRank.attack,
        parseInt(e.target.value),
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

  const onSpAtkRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      new StatsRank(
        attackingPokemonStatus.statsRank.attack,
        attackingPokemonStatus.statsRank.defense,
        parseInt(e.target.value),
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

  const onSpDefRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      new StatsRank(
        attackingPokemonStatus.statsRank.attack,
        attackingPokemonStatus.statsRank.defense,
        attackingPokemonStatus.statsRank.spAtk,
        parseInt(e.target.value),
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

  const onSpeedRankUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      new StatsRank(
        attackingPokemonStatus.statsRank.attack,
        attackingPokemonStatus.statsRank.defense,
        attackingPokemonStatus.statsRank.spAtk,
        attackingPokemonStatus.statsRank.spDef,
        parseInt(e.target.value)
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

  const onTeraTypeUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
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

  const onAbilityFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowAbilityModal(true);
  };

  const onItemUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      new Item(parseInt(e.target.value)),
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onIsCriticalUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      attackingPokemonStatus.ability,
      attackingPokemonStatus.item,
      e.target.checked,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);
  };

  const onStatusAilmentUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
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
    const word = e.target.value;
    setPokemonList(
      Pokemon.listAllValidSVPokemons().filter((pokemon) =>
        pokemon.nameJp.startsWith(convertHiraganaToKatakana(word))
      )
    );
  };

  const onSelectPokemonSubmit = (newPokemon: Pokemon) => {
    const newValue = new AttackingPokemonStatus(
      newPokemon,
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

    setPokemonList(Pokemon.listAllValidSVPokemons());
    setShowPokemonModal(false);
  };

  const onSelectPokemonClose = () => {
    setPokemonList(Pokemon.listAllValidSVPokemons());
    setShowPokemonModal(false);
  };

  const onExpandStatsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpandStats(!expandStats);
  };

  const onExpandRankClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpandRank(!expandRank);
  };

  const onSelectAbilityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setAbilityList(
      Ability.listAllValidSVAbilities().filter((ability) =>
      convertHiraganaToKatakana(ability.nameJp).startsWith(convertHiraganaToKatakana(word))
      )
    );
  };

  const onSelectAbilitySubmit = (newAbility: Ability) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
      attackingPokemonStatus.level,
      attackingPokemonStatus.iv,
      attackingPokemonStatus.ev,
      attackingPokemonStatus.nature,
      attackingPokemonStatus.statsRank,
      attackingPokemonStatus.move,
      attackingPokemonStatus.teraType,
      newAbility,
      attackingPokemonStatus.item,
      attackingPokemonStatus.isCriticalHit,
      attackingPokemonStatus.statusAilment
    );
    onUpdate(newValue);

    setAbilityList(Ability.listAllValidSVAbilities());
    setShowAbilityModal(false);
  };

  const onSelectAbilityClose = () => {
    setAbilityList(Ability.listAllValidSVAbilities());
    setShowAbilityModal(false);
  };

  const onSelectMoveUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setMoveList(
      Move.listAllValidSVMoves().filter((move) =>
      convertHiraganaToKatakana(move.nameJp).startsWith(convertHiraganaToKatakana(word))
      )
    );
  };

  const onSelectMoveSubmit = (newMove: Move) => {
    const newValue = new AttackingPokemonStatus(
      attackingPokemonStatus.pokemon,
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

    setMoveList(Move.listAllValidSVMoves());
    setShowMoveModal(false);
  };

  const onSelectMoveClose = () => {
    setMoveList(Move.listAllValidSVMoves());
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
          <div className="space-y-2">
            <div>
              <label htmlFor="attacking_pokemon_name" className="text-sm">
                攻撃側ポケモン
              </label>
              <input
                type="text"
                readOnly
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
                <span>
                  H{attackingPokemonStatus.pokemon.baseStats.hp.toString()}
                </span>
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
            <div className="space-y-2">
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      HP
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_hp_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_hp_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onHpIVUpdate}
                      value={attackingPokemonStatus.iv.hp.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_hp_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_hp_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onHpEVUpdate}
                      value={attackingPokemonStatus.ev.hp.toString()}
                    ></input>
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
                      攻撃
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_attack_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_attack_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackIVUpdate}
                      value={attackingPokemonStatus.iv.attack.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_attack_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_attack_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackEVUpdate}
                      value={attackingPokemonStatus.ev.attack.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          attackingPokemonStatus.nature.attack === 0.9
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
                          attackingPokemonStatus.nature.attack === 1.0
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
                          attackingPokemonStatus.nature.attack === 1.1
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
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      防御
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_defense_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_defense_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseIVUpdate}
                      value={attackingPokemonStatus.iv.defense.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_defense_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_defense_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseEVUpdate}
                      value={attackingPokemonStatus.ev.defense.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          attackingPokemonStatus.nature.defense === 0.9
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
                          attackingPokemonStatus.nature.defense === 1.0
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
                          attackingPokemonStatus.nature.defense === 1.1
                            ? "bg-blue-800 hover:bg-blue-900 text-white text-sm py-1 px-4 rounded-l"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-4 rounded-l"
                        }
                        onClick={(event) => onDefenseNatureUpdate(event, 1.1)}
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
                      特攻
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_atk_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_sp_atk_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkIVUpdate}
                      value={attackingPokemonStatus.iv.spAtk.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_atk_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_sp_atk_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkEVUpdate}
                      value={attackingPokemonStatus.ev.spAtk.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          attackingPokemonStatus.nature.spAtk === 0.9
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
                          attackingPokemonStatus.nature.spAtk === 1.0
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
                          attackingPokemonStatus.nature.spAtk === 1.1
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
              {expandStats ? (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h6 className="text-sm font-bold leading-none text-gray-900">
                      特防
                    </h6>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_def_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_sp_def_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefIVUpdate}
                      value={attackingPokemonStatus.iv.spDef.toString()}
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
                      id="attacking_pokemon_sp_def_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefEVUpdate}
                      value={attackingPokemonStatus.ev.spDef.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          attackingPokemonStatus.nature.spDef === 0.9
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
                          attackingPokemonStatus.nature.spDef === 1.0
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
                          attackingPokemonStatus.nature.spDef === 1.1
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
                      htmlFor="attacking_pokemon_speed_iv"
                      className="text-sm"
                    >
                      個体値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_speed_iv"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedIVUpdate}
                      value={attackingPokemonStatus.iv.speed.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_speed_ev"
                      className="text-sm"
                    >
                      努力値
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_speed_ev"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedEVUpdate}
                      value={attackingPokemonStatus.ev.speed.toString()}
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center my-1">
                    <label className="text-sm">性格補正</label>
                    <span>
                      <button
                        type="button"
                        className={
                          attackingPokemonStatus.nature.speed === 0.9
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
                          attackingPokemonStatus.nature.speed === 1.0
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
                          attackingPokemonStatus.nature.speed === 1.1
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
                      htmlFor="attacking_pokemon_attack_rank"
                      className="text-sm"
                    >
                      攻撃
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_attack_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onAttackRankUpdate}
                      value={attackingPokemonStatus.statsRank.attack.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_defense_rank"
                      className="text-sm"
                    >
                      防御
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_defense_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onDefenseRankUpdate}
                      value={attackingPokemonStatus.statsRank.defense.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ||
                attackingPokemonStatus.move.category.equals(
                  MoveCategory.fromNameEn("Special")
                ) ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_atk_rank"
                      className="text-sm"
                    >
                      特攻
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_sp_atk_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpAtkRankUpdate}
                      value={attackingPokemonStatus.statsRank.spAtk.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_sp_def_rank"
                      className="text-sm"
                    >
                      特防
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_sp_def_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpDefRankUpdate}
                      value={attackingPokemonStatus.statsRank.spDef.toString()}
                    ></input>
                  </div>
                ) : null}
                {expandRank ? (
                  <div className="flex flex-row justify-between items-center my-1">
                    <label
                      htmlFor="attacking_pokemon_attack_rank"
                      className="text-sm"
                    >
                      素早さ
                    </label>
                    <input
                      type="number"
                      id="attacking_pokemon_speed_rank"
                      className="items-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSpeedRankUpdate}
                      value={attackingPokemonStatus.statsRank.speed.toString()}
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
              <label htmlFor="attacking_pokemon_move" className="text-sm">
                技
              </label>
              <input
                type="text"
                id="attacking_pokemon_move"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onMoveFocus}
                defaultValue={attackingPokemonStatus.move.nameJp}
              ></input>
              <div className="flex space-x-1 text-xs">
                <span>{attackingPokemonStatus.move.category.nameJp}</span>
                <span>{attackingPokemonStatus.move.type.nameJp}</span>
                <span>威力{attackingPokemonStatus.move.power}</span>
                <span>PP{attackingPokemonStatus.move.pp}</span>
              </div>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_tera_type" className="text-sm">
                テラスタイプ
              </label>
              <select
                id="attacking_pokemon_tera_type"
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
              <label htmlFor="attacking_pokemon_ability" className="text-sm">
                特性
              </label>
              <input
                type="text"
                id="attacking_pokemon_ability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={onAbilityFocus}
                defaultValue={attackingPokemonStatus.ability.nameJp}
              ></input>
            </div>
            <div>
              <label htmlFor="attacking_pokemon_item" className="text-sm">
                道具
              </label>
              <select
                id="attacking_pokemon_item"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onItemUpdate}
                defaultValue={"0"}
              >
                {Item.listAllValidItemsForAttacker().map((e) => (
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
              <select
                id="attacking_pokemon_status_ailment"
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
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={onSelectPokemonClose}
            ></div>
            <div className="flex py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex flex-col">
                  <form className="flex flex-row justify-between">
                    <button
                      className="h-14 w-14 mr-4"
                      onClick={onSelectPokemonClose}
                    >
                      <svg
                        className="h-12 w-12 text-gray-300"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="attacking_pokemon_select_pokemon"
                      className="shadow appearance-none border rounded h-14 py-2 px-3 w-full text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSelectPokemonUpdate}
                      placeholder="ポケモン名を入力"
                    ></input>
                  </form>
                </div>
                <div className="mt-4 text-left max-h-screen overflow-y-scroll">
                  <ul>
                    {pokemonList.map((e) => (
                      <li
                        key={e.id}
                        onClick={() => onSelectPokemonSubmit(e)}
                        className="h-8 p-2 flex items-center hover:bg-gray-200"
                      >
                        <div>{e.nameJp}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showMoveModal ? (
        <>
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={onSelectMoveClose}
            ></div>
            <div className="flex py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex flex-col">
                  <form className="flex flex-row justify-between">
                    <button
                      className="h-14 w-14 mr-4"
                      onClick={onSelectMoveClose}
                    >
                      <svg
                        className="h-12 w-12 text-gray-300"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="attacking_pokemon_select_move"
                      className="shadow appearance-none border rounded h-14 py-2 px-3 w-full text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSelectMoveUpdate}
                      placeholder="技名を入力"
                    ></input>
                  </form>
                </div>
                <div className="mt-4 text-left max-h-screen overflow-y-scroll">
                  <ul>
                    {moveList.map((e) => (
                      <li
                        key={e.id}
                        onClick={() => onSelectMoveSubmit(e)}
                        className="h-8 p-2 flex items-center hover:bg-gray-200"
                      >
                        <div>{e.nameJp}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showAbilityModal ? (
        <>
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={onSelectAbilityClose}
            ></div>
            <div className="flex py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 flex flex-col">
                  <form className="flex flex-row justify-between">
                    <button
                      className="h-14 w-14 mr-4"
                      onClick={onSelectAbilityClose}
                    >
                      <svg
                        className="h-12 w-12 text-gray-300"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="attacking_pokemon_select_ability"
                      className="shadow appearance-none border rounded h-14 py-2 px-3 w-full text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={onSelectAbilityUpdate}
                      placeholder="特性を入力"
                    ></input>
                  </form>
                </div>
                <div className="mt-4 text-left max-h-screen overflow-y-scroll">
                  <ul>
                    {abilityList.map((e) => (
                      <li
                        key={e.id}
                        onClick={() => onSelectAbilitySubmit(e)}
                        className="h-8 p-2 flex items-center hover:bg-gray-200"
                      >
                        <div>{e.nameJp}</div>
                      </li>
                    ))}
                  </ul>
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
