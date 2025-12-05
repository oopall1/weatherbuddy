import { useState } from "react";

import { useWeather } from "./common/hooks/queries/useWeather.query";

import WeatherCard from "./components/WeatherCard";

import "./App.css";

function App() {
  const [city, setCity] = useState<string | null>(null);

  const { data: weatherData } = useWeather(city);

  return (
    <>
      <h1 className="text-red-500">Weather</h1>
      <div className="card">
        <WeatherCard data={weatherData!} />
      </div>
    </>
  );
}

export default App;
