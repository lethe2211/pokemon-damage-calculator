import { ReactElement, useState } from "react";
import AttackingPokemon from "../components/attacking-pokemon";
import DefendingPokemon from "../components/defending-pokemon";
import Environment from "../components/environment";
import Layout from "../components/layout";
import Result from "../components/result";
import { AttackingPokemonStatus } from "../models/attacking-pokemon-status";
import { CalculationResources } from "../models/calculation-resources";
import { DefendingPokemonStatus } from "../models/defending-pokemon-status";
import { Move } from "../models/move";
import { Pokemon } from "../models/pokemon";
import { TeraType } from "../models/tera-type";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const defaultCalculationResource = new CalculationResources(
    new AttackingPokemonStatus(
      new Pokemon(
        149
      ),
      50,
      {
        hp: 31,
        attack: 31,
        defense: 31,
        spAtk: 31,
        spDef: 31,
        speed: 31,
      },
      {
        hp: 252,
        attack: 252,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 4,
      },
      {
        attack: 1.0,
        defense: 1.0,
        spAtk: 1.0,
        spDef: 1.0,
        speed: 1.0,
      },
      {
        attack: 0,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
      },
      new Move(
        900
      ),
      new TeraType(16),
      {
        id: 1,
      },
      {
        id: 1,
      },
      false,
      {
        id: 0,
      }
    ),
    new DefendingPokemonStatus(
      new Pokemon(149),
      50,
      {
        hp: 31,
        attack: 31,
        defense: 31,
        spAtk: 31,
        spDef: 31,
        speed: 31,
      },
      {
        hp: 252,
        attack: 252,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 4,
      },
      {
        attack: 1.0,
        defense: 1.0,
        spAtk: 1.0,
        spDef: 1.0,
        speed: 1.0,
      },
      {
        attack: 0,
        defense: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
      },
      new TeraType(16),
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      }
    ),
    {}
  );

  const [calculationResources, setCalculationResources] =
    useState<CalculationResources>(defaultCalculationResource);

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      <AttackingPokemon
        attackingPokemonStatus={calculationResources.attackingPokemonStatus}
        onUpdate={(attackingPokemonStatus) => {
          const newValue = calculationResources.updateAttackingPokemonStatus(
            attackingPokemonStatus
          );
          setCalculationResources(newValue);
        }}
      ></AttackingPokemon>
      <DefendingPokemon
        attackingPokemonStatus={calculationResources.attackingPokemonStatus}
        defendingPokemonStatus={calculationResources.defendingPokemonStatus}
        onUpdate={(defendingPokemonStatus) => {
          const newValue = new CalculationResources(
            calculationResources.attackingPokemonStatus,
            defendingPokemonStatus,
            calculationResources.environmentStatus
          );
          setCalculationResources(newValue);
        }}
      ></DefendingPokemon>
      <Environment></Environment>
      <Result damageResult={calculationResources.calculateDamage()}></Result>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
