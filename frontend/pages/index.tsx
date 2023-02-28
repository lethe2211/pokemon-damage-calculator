import { ReactElement, useState } from "react";
import AttackingPokemon from "../components/attacking-pokemon";
import DefendingPokemon from "../components/defending-pokemon";
import Environment from "../components/environment";
import Layout from "../components/layout";
import Result from "../components/result";
import { Ability } from "../models/ability";
import { AttackingPokemonStatus } from "../models/attacking-pokemon-status";
import { CalculationResources } from "../models/calculation-resources";
import { DefendingPokemonStatus } from "../models/defending-pokemon-status";
import { EV } from "../models/ev";
import { Item } from "../models/item";
import { IV } from "../models/iv";
import { Move } from "../models/move";
import { Nature } from "../models/nature";
import { Pokemon } from "../models/pokemon";
import { StatsRank } from "../models/stats-rank";
import { StatusAilment } from "../models/status-ailment";
import { TeraType } from "../models/tera-type";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const defaultCalculationResource = new CalculationResources(
    new AttackingPokemonStatus(
      new Pokemon(
        149
      ),
      50,
      new IV(
        31,
        31,
        31,
        31,
        31,
        31,
      ),
      new EV(
        252,
        252,
        0,
        0,
        0,
        4,
      ),
      new Nature(
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
      ),
      new StatsRank(
        0,
        0,
        0,
        0,
        0,
      ),
      new Move(
        900
      ),
      new TeraType(0),
      new Ability(
        1
      ),
      new Item(
        1
      ),
      false,
      new StatusAilment(
        0
      )
    ),
    new DefendingPokemonStatus(
      new Pokemon(149),
      50,
      new IV(
        31,
        31,
        31,
        31,
        31,
        31,
      ),
      new EV(
        252,
        252,
        0,
        0,
        0,
        4,
      ),
      new Nature(
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
      ),
      new StatsRank(
        0,
        0,
        0,
        0,
        0,
      ),
      new TeraType(0),
      new Ability(
        1
      ),
      new Item(
        1
      ),
      new StatusAilment(
        0
      )
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
