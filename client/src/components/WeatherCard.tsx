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
    <div>
      <div>
        <img
          src={getWeatherIconUrl(parsedData.description.toLowerCase(), true)}
          alt={parsedData.description}
        />
        <span>{Math.round(parsedData.temperature)}°C</span>
        <p>{parsedData.date.toDateString()}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
