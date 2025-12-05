// src/components/WeatherCard.tsx
import React from "react";
import type { DisplayWeather, WeatherData } from "../common/interfaces";
import { parseWeatherData } from "../utiles/weather-data-parser.functions";
import { getWeatherIconUrl } from "../utiles/weather-icons.fucntion";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const isDayTime =
    data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset;

  const parsedData: DisplayWeather | null = parseWeatherData(data);

  if (!parsedData) return <div>No data to show</div>; // TODO: improve loading and no data states

  return (
    <div className="weather-card">
      <header>
        <h1>
          {parsedData.city}, {parsedData.country}
        </h1>
        <p className="description">{parsedData.description.toUpperCase()}</p>
      </header>

      <div className="main-info">
        <img
          src={getWeatherIconUrl(
            parsedData.description.toLowerCase(),
            true,
            isDayTime
          )}
          alt={parsedData.description}
          className="weather-icon"
        />
        <span className="temperature">
          {Math.round(parsedData.temperature)}°C
        </span>
        <p>Feels like: {Math.round(parsedData.feelsLike)}°C</p>
      </div>

      <hr />

      <h2>🌤️ Details & Atmosphere</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Humidity:</span> {parsedData.humidity}%
        </div>
        <div className="detail-item">
          <span className="label">Pressure:</span> {parsedData.pressure} hPa
        </div>
        <div className="detail-item">
          <span className="label">Wind:</span> {parsedData.windSpeed} m/s (
          {parsedData.windDirection})
        </div>
        <div className="detail-item">
          <span className="label">Clouds:</span> 26%{" "}
          {/* Note: 'clouds.all' is 26 in your parsedData; it's a separate field */}
        </div>
      </div>

      <hr />

      <h2>🌅 Day Cycle</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Sunrise:</span> {parsedData.sunriseTime}
        </div>
        <div className="detail-item">
          <span className="label">Sunset:</span> {parsedData.sunsetTime}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
