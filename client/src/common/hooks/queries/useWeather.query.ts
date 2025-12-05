import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../../api/weather.api";
import type { WeatherData } from "../../interfaces";

export const useWeather = (cityName: string | null) => {
  return useQuery<WeatherData | null, Error>({
    queryKey: ["weather", cityName],
    queryFn: () => getWeather(cityName),
  });
};
