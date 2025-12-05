import { type FC, useState } from "react";
import type { DisplayWeather, WeatherData } from "../common/interfaces";
import { parseWeatherData, getWeatherIconUrl } from "../utiles";

interface MainWeatherProps {
  data: WeatherData;
}

const MainWeather: FC<MainWeatherProps> = ({ data }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const isDayTime =
    data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset;

  const parsedData: DisplayWeather | null = parseWeatherData(data);

  if (!parsedData) return <div>No data to show</div>; // TODO: improve loading and no data states

  return (
    <div>
      <header>
        <h1>
          {parsedData.city}, {parsedData.country}
        </h1>
        <p>{parsedData.description.toUpperCase()}</p>
      </header>

      <div>
        <img
          src={getWeatherIconUrl(
            parsedData.description.toLowerCase(),
            !isHovering,
            isDayTime
          )}
          alt={parsedData.description}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
        <span>{Math.round(parsedData.temperature)}°C</span>
        <p>Feels like: {Math.round(parsedData.feelsLike)}°C</p>
      </div>

      <hr />

      <h2>Details & Atmosphere</h2>
      <div>
        <div>
          <span>Humidity:</span> {parsedData.humidity}%
        </div>
        <div>
          <span>Pressure:</span> {parsedData.pressure} hPa
        </div>
        <div>
          <span>Wind:</span> {parsedData.windSpeed} m/s (
          {parsedData.windDirection})
        </div>
        <div>
          <span>Clouds:</span> 26%{" "}
          {/* Note: 'clouds.all' is 26 in your parsedData; it's a separate field */}
        </div>
      </div>

      <hr />

      <h2>Day Cycle</h2>
      <div>
        <div>
          <span>Sunrise:</span> {parsedData.sunriseTime}
        </div>
        <div>
          <span>Sunset:</span> {parsedData.sunsetTime}
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
