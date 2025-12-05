import { useState } from "react";

import { useWeather } from "./common/hooks/queries/useWeather.query";

import WeatherCard from "./components/WeatherCard";
import { parseWeatherData } from "./utiles/weather-data-parser";

import "./App.css";

function App() {
  const [city, setCity] = useState<string | null>(null);

  const { data: weatherData } = useWeather(city);

  const parsedData = parseWeatherData(weatherData ?? null);

  return (
    <>
      <h1 className="text-red-500">Weather</h1>
      <div className="card">
        {parsedData && <WeatherCard data={parsedData} />}
      </div>
    </>
  );
}

export default App;
