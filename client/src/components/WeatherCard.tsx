import { type FC } from "react";
import type { DisplayWeather, WeatherData } from "../common/interfaces";
import { getWeatherIconUrl, parseWeatherData } from "../utiles";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: FC<WeatherCardProps> = ({ data }) => {
  const isDayTime =
    data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset; // TODO: remove this aND GET BACK THE REGULAR ICONS

  const parsedData: DisplayWeather | null = parseWeatherData(data);

  if (!parsedData) return <div>No data to show</div>; // TODO: improve loading and no data states

  return (
    <div>
      <div>
        <img
          src={getWeatherIconUrl(
            parsedData.description.toLowerCase(),
            true,
            isDayTime
          )}
          alt={parsedData.description}
        />
        <span>{Math.round(parsedData.temperature)}°C</span>
      </div>
    </div>
  );
};

export default WeatherCard;
