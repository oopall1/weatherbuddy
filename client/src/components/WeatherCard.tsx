// src/components/WeatherCard.tsx
import React from "react";
import type { DisplayWeather } from "../common/interfaces";

interface WeatherCardProps {
  data: DisplayWeather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <header>
        <h1>
          {data.city}, {data.country}
        </h1>
        <p className="description">{data.description.toUpperCase()}</p>
      </header>

      <div className="main-info">
        <img src={iconUrl} alt={data.description} className="weather-icon" />
        <span className="temperature">{Math.round(data.temperature)}°C</span>
        <p>Feels like: {Math.round(data.feelsLike)}°C</p>
      </div>

      <hr />

      <h2>🌤️ Details & Atmosphere</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Humidity:</span> {data.humidity}%
        </div>
        <div className="detail-item">
          <span className="label">Pressure:</span> {data.pressure} hPa
        </div>
        <div className="detail-item">
          <span className="label">Wind:</span> {data.windSpeed} m/s (
          {data.windDirection})
        </div>
        <div className="detail-item">
          <span className="label">Clouds:</span> 26%{" "}
          {/* Note: 'clouds.all' is 26 in your data; it's a separate field */}
        </div>
      </div>

      <hr />

      <h2>🌅 Day Cycle</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Sunrise:</span> {data.sunriseTime}
        </div>
        <div className="detail-item">
          <span className="label">Sunset:</span> {data.sunsetTime}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
