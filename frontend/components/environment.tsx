import { EnvironmentStatus } from "../models/environment-status";
import { Terrain } from "../models/terrain";
import { Weather } from "../models/weather";

type Props = {
  environmentStatus: EnvironmentStatus;
  onUpdate: (environmentStatus: EnvironmentStatus) => void;
};

const Environment: React.FC<Props> = ({
  environmentStatus,
  onUpdate
}) => {

  const onWeatherUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new EnvironmentStatus(
      new Weather(parseInt(e.target.value)),
      environmentStatus.terrain
    );
    onUpdate(newValue);
  }

  const onTerrainUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = new EnvironmentStatus(
      environmentStatus.weather,
      new Terrain(parseInt(e.target.value)),
    );
    onUpdate(newValue);
  }

  return (
    <section className="w-full max-w-md p-4 mb-10 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            場の状態
          </h5>
        </div>
        <form className="space-y-8">
          <div className="space-y-1">
            <div>
              <label htmlFor="environment_weather" className="text-sm">
                天候
              </label>
              <select
                id="environment_weather"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onWeatherUpdate}
                defaultValue={"0"}
              >
                {Weather.listAllValidWeathers().map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nameJp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="environment_terrain" className="text-sm">
                フィールド
              </label>
              <select
                id="environment_terrain"
                className="shadow appearance-none border rounded w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={onTerrainUpdate}
                defaultValue={"0"}
              >
                {Terrain.listAllValidTerrains().map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nameJp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Environment;
