import { useState } from "react";

import { useWeather, useForecastWeather } from "./common/hooks/queries";

import WeatherCard from "./components/WeatherCard";

import "./App.css";

function App() {
  const [city, setCity] = useState<string | null>(null);

  const { data: weatherData } = useWeather(city);
  const { data: forecastData } = useForecastWeather(city);

  console.log("Forecast Data:", forecastData);

  return (
    <div
      className={`bg-[url('/images/background.jpg')] bg-cover bg-center h-screen w-full`}
    >
      <h1>Weather</h1>
      <div>
        <WeatherCard data={weatherData!} />
      </div>
    </div>
  );
}

export default App;
