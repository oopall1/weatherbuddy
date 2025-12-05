import type { DisplayWeather, WeatherData } from "../common/interfaces";

/**
 * Converts Unix timestamp (seconds) to a readable time string (e.g., HH:mm).
 */
const convertTimestampToTime = (
  timestamp: number,
  timezone: number
): string => {
  // Convert to milliseconds and adjust for the city's timezone offset
  const date = new Date((timestamp + timezone) * 1000);

  // Use UTC methods to prevent the local machine's timezone from interfering
  // and only display hours/minutes based on the city's offset.
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * Converts wind degree (0-360) to a cardinal direction (e.g., N, SW, E).
 */
const getWindDirection = (degree: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

/**
 * Parses the raw API data into the DisplayWeather interface.
 */
export const parseWeatherData = (
  rawData: WeatherData | null
): DisplayWeather | null => {
  if (!rawData) {
    return null;
  }

  return {
    city: rawData.name,
    country: rawData.sys.country,
    temperature: rawData.main.temp,
    feelsLike: rawData.main.feels_like,
    description: rawData.weather[0].description,
    iconCode: rawData.weather[0].icon,
    humidity: rawData.main.humidity,
    pressure: rawData.main.pressure,
    windSpeed: rawData.wind.speed,
    windDirection: getWindDirection(rawData.wind.deg),
    sunriseTime: convertTimestampToTime(rawData.sys.sunrise, rawData.timezone),
    sunsetTime: convertTimestampToTime(rawData.sys.sunset, rawData.timezone),
  };
};
