import { useState } from "react";

import {
  useWeather,
  useForecastWeather,
  useWeatherByCoords,
} from "./common/hooks/queries";

import MainWeather from "./components/MainWeather";
import NextDays from "./components/NextDays";
import SearchBar from "./components/SearchBar";

import type { WeatherQuery } from "./common/types";

import "./App.css";

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [cityInput, setCityInput] = useState<string>("");

  const handleWeatherQuery = (query: WeatherQuery) => {
    // If the query is an object (coordinates from suggestion)
    if (typeof query !== "string") {
      setCoords(query);
      setCity(null);
    } else {
      // If the query is a string (city name from manual search)
      setCity(query);
      setCoords(null);
    }
  };

  const { data: weatherData } = useWeather(city, { enabled: city !== null });

  const { data: forecastData } = useForecastWeather(
    city,
    coords?.lat,
    coords?.lon
  );

  const { data: weatherDataByCoords } = useWeatherByCoords(
    coords ? coords.lat : 0,
    coords ? coords.lon : 0,
    { enabled: coords !== null }
  );

  // Determine which data source to use
  const mainWeatherData = coords ? weatherDataByCoords : weatherData;

  if (!mainWeatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-[url('/images/background.jpg')] bg-cover bg-center h-screen w-full px-8 py-0`}
    >
      <div className="flex flex-row justify-between p-6 items-center mb-10">
        <h1 className="text-white text-2xl font-bold">WeatherBuddy</h1>
        <SearchBar
          handleFetchWeather={handleWeatherQuery}
          cityInput={cityInput}
          setCityInput={setCityInput}
          onGeolocationRequest={() => {
            setCity(null);
            setCoords(null);
          }}
        />
      </div>
      <div className="flex flex-row gap-[10%]">
        <MainWeather data={mainWeatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
