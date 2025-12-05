import { useState } from "react";

import {
  useWeather,
  useForecastWeather,
  useWeatherByCoords,
} from "./common/hooks/queries";

import MainWeather from "./components/MainWeather";
import NextDays from "./components/NextDays";
import SearchBar from "./components/SearchBar";

import "./App.css";

// Define a union type for the coordinate object or the city name string
type WeatherQuery = { lat: number; lon: number } | string;

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [cityInput, setCityInput] = useState<string>("");

  // Create the unified handler function
  const handleWeatherQuery = (query: WeatherQuery) => {
    // If the query is an object (coordinates from suggestion)
    if (typeof query !== "string") {
      setCoords(query); // Set coordinates
      setCity(null); // Clear city name
    } else {
      // If the query is a string (city name from manual search)
      setCity(query); // Set city name
      setCoords(null); // Clear coordinates
    }
  };

  // The existing hooks are queried in parallel.
  // NOTE: You must update useWeather and useForecastWeather to be disabled
  // when `coords` is not null, and vice-versa for useWeatherByCoords.

  // Conditionally disable hooks to prevent unnecessary fetches
  const { data: weatherData } = useWeather(
    city,
    { enabled: city !== null } // Enable only if city is set
  );
  const { data: forecastData } = useForecastWeather(
    city,
    coords?.lat,
    coords?.lon
  );

  const { data: weatherDataByCoords } = useWeatherByCoords(
    coords ? coords.lat : 0,
    coords ? coords.lon : 0,
    { enabled: coords !== null } // Enable only if coords are set
  );

  // Determine which data source to use
  const mainWeatherData = coords ? weatherDataByCoords : weatherData;

  // It's also important to update the forecast hook to use coords for consistency
  // If you haven't, forecastData will only load when searching by city name.
  // For this fix, we assume you'll update the useForecastWeather hook later.

  if (!mainWeatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`bg-[url('/images/background.jpg')] bg-cover bg-center h-screen w-full`}
    >
      <div className="flex flex-row justify-between p-6 items-center">
        <h1 className="text-white text-2xl font-bold">WeatherBuddy</h1>
        <SearchBar
          // Pass the unified handler function
          handleFetchWeather={handleWeatherQuery}
          cityInput={cityInput}
          setCityInput={setCityInput}
          onGeolocationRequest={() => {
            setCity(null);
            setCoords(null);
          }}
        />
      </div>
      <div className="flex flex-row">
        <MainWeather data={mainWeatherData} />
        <NextDays data={forecastData} />
      </div>
    </div>
  );
}

export default App;
