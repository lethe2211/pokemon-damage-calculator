import { Terrain } from "./terrain";
import { Weather } from "./weather";

export class EnvironmentStatus {
  weather: Weather;
  terrain: Terrain;

  constructor(
    weather: Weather,
    terrain: Terrain
  ) {
    this.weather = weather;
    this.terrain = terrain;
  }
}

