import { useQuery } from "@tanstack/react-query";
import { getForecastWeather } from "../../api/weather.api";
import type { WeatherData } from "../../interfaces";

export const useForecastWeather = (
  dateToExclude: Date,
  cityName: string | null,
  lat?: number,
  lon?: number
) => {
  return useQuery<WeatherData[] | null, Error>({
    queryKey: ["forecast", cityName, lat, lon],
    queryFn: () => getForecastWeather(dateToExclude, cityName, lat, lon),
  });
};
