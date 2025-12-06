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

  const isCitySearchEnabled =
    city !== null || (city === null && coords === null);

  const { data: weatherData, isLoading: isWeatherLoading } = useWeather(city, {
    enabled: isCitySearchEnabled,
  });

  const { data: forecastData, isLoading: isForecastLoading } =
    useForecastWeather(city, coords?.lat, coords?.lon);

  const { data: weatherDataByCoords, isLoading: isCoordsLoading } =
    useWeatherByCoords(coords ? coords.lat : 0, coords ? coords.lon : 0, {
      enabled: coords !== null,
    });

  const isLoading =
    (coords !== null ? isCoordsLoading : isWeatherLoading) || isForecastLoading; // Determine which data source to use

  const mainWeatherData = coords ? weatherDataByCoords : weatherData;

  if (isLoading || !mainWeatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full **flex flex-col**">
      <div className="flex flex-row justify-between p-6 items-center bg-[#a2e4fe]">
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
      <div className="p-6 flex flex-row gap-[10%] bg-[url('/images/background.jpg')] bg-cover bg-center **flex-grow**">
        <MainWeather data={mainWeatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
