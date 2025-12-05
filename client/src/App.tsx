import { useState } from "react";

import { useWeather, useForecastWeather } from "./common/hooks/queries";

import MainWeather from "./components/MainWeather";
import NextDays from "./components/NextDays";
import SearchBar from "./components/SearchBar";

import "./App.css";

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState<string>("");

  const { data: weatherData } = useWeather(city); //TODO: format before use
  const { data: forecastData } = useForecastWeather(city);

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-[url('/images/background.jpg')] bg-cover bg-center h-screen w-full`}
    >
      <div className="flex flex-row justify-between p-6 items-center">
        <h1 className="text-white text-2xl font-bold">WeatherBuddy</h1>
        <SearchBar
          handleFetchWeather={setCity}
          cityInput={cityInput}
          setCityInput={setCityInput}
          onGeolocationRequest={() => setCity(null)}
        />
      </div>
      <div className="flex flex-row">
        <MainWeather data={weatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
