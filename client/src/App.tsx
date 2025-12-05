import { useState } from "react";

import { useWeather, useForecastWeather } from "./common/hooks/queries";

import MainWeather from "./components/MainWeather";

import "./App.css";
import NextDays from "./components/NextDays";

function App() {
  const [city, setCity] = useState<string | null>("london");

  const { data: weatherData } = useWeather(city); //TODO: format before use
  const { data: forecastData } = useForecastWeather(city);

  console.log(forecastData);

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-[url('/images/background.jpg')] bg-cover bg-center h-screen w-full`}
    >
      <h1>Weather</h1>
      <div className="flex flex-row">
        <MainWeather data={weatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
