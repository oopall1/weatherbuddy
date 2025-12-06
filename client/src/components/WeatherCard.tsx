import { type FC } from "react";
import type { DisplayWeather, WeatherData } from "../common/interfaces";
import { getWeatherIconUrl, parseWeatherData } from "../utiles";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: FC<WeatherCardProps> = ({ data }) => {
  const parsedData: DisplayWeather | null = parseWeatherData(data);

  if (!parsedData) return <div>No data to show</div>; // TODO: improve loading and no data states

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg w-full max-w-xs transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="flex flex-col h-full justify-between items-start text-black">
        <p className="text-sm font-semibold opacity-80 mb-3 tracking-wider">
          {parsedData.date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          })}
        </p>

        <div className="flex w-full justify-between items-center mt-2">
          <img
            src={getWeatherIconUrl(parsedData.description.toLowerCase(), true)}
            alt={parsedData.description}
            className="h-15 object-contain mx-auto"
          />

          <span className="text-3xl font-bold text-black ml-4">
            {Math.round(parsedData.temperature)}°C
          </span>
        </div>

        <p className="text-xs font-medium capitalize mt-3 opacity-70">
          {parsedData.description}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
