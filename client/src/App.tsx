import { useState } from "react";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

import {
  useWeather,
  useForecastWeather,
  useWeatherByCoords,
} from "./common/hooks/queries";

import MainWeather from "./components/MainWeather";
import NextDays from "./components/NextDays";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";

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

  const { data: weatherDataByCoords, isLoading: isCoordsLoading } =
    useWeatherByCoords(coords ? coords.lat : 0, coords ? coords.lon : 0, {
      enabled: coords !== null,
    });

  const mainWeatherData = coords ? weatherDataByCoords : weatherData;

  const { data: forecastData, isLoading: isForecastLoading } =
    useForecastWeather(
      mainWeatherData?.dt ? new Date(mainWeatherData?.dt) : new Date(),
      city,
      coords?.lat,
      coords?.lon
    );

  const isLoading =
    (coords !== null ? isCoordsLoading : isWeatherLoading) || isForecastLoading; // Determine which data source to use

  if (isLoading || !mainWeatherData || !forecastData) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div
        className={clsx(
          "flex p-4 items-center bg-[#a2e4fe]",
          isMobile ? "flex-col gap-3" : " flex-row justify-between"
        )}
      >
        <h1 className="text-black text-2xl font-bold">WeatherBuddy</h1>
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
      <div
        className={clsx(
          "p-6 flex items-center bg-[url('/images/background.jpg')] bg-cover bg-center grow",
          isMobile ? "flex-col gap-4" : "flex-row  gap-[10%] "
        )}
      >
        <MainWeather data={mainWeatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
