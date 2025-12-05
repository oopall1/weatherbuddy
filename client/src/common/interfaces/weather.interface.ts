export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  timezone: number;
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    deg: number;
    speed: number;
  };
}

export interface DisplayWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  iconCode: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string; // Converted from degrees
  sunriseTime: string; // Converted to readable time
  sunsetTime: string; // Converted to readable time
}
