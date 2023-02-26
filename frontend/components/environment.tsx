type Props = {};

const Environment: React.FC<Props> = ({}) => {
  return (
    <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
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
              <input
                type="text"
                id="environment_weather"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
            </div>
            <div>
              <label htmlFor="environment_field" className="text-sm">
                フィールド
              </label>
              <input
                type="text"
                id="environment_field"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Environment;
