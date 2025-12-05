import { useState } from "react";

import { useWeather } from "./common/hooks/queries/useWeather.query";

import WeatherCard from "./components/WeatherCard";

import "./App.css";
import { useForecastWeather } from "./common/hooks/queries/useForecastWeather.query";

function App() {
  const [city, setCity] = useState<string | null>(null);

  const { data: weatherData } = useWeather(city);
  const { data: forecastData } = useForecastWeather(city);

  console.log("Forecast Data:", forecastData);

  return (
    <>
      <h1>Weather</h1>
      <div>
        <WeatherCard data={weatherData!} />
      </div>
    </>
  );
}

export default App;
