import { useQuery } from "@tanstack/react-query";
import { getForecastWeather } from "../../api/weather.api";
import type { WeatherData } from "../../interfaces";

export const useForecastWeather = (cityName: string | null) => {
  return useQuery<WeatherData[] | null, Error>({
    queryKey: ["forecast", cityName],
    queryFn: () => getForecastWeather(cityName),
  });
};
