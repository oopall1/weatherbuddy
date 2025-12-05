import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getWeatherByCoords } from "../../api/weather.api";
import type { WeatherData } from "../../interfaces";

export const useWeatherByCoords = (
  lat: number,
  lon: number,
  options?: Partial<
    UseQueryOptions<
      WeatherData | null,
      Error,
      WeatherData | null,
      [string, number, number]
    >
  >
) => {
  return useQuery<
    WeatherData | null,
    Error,
    WeatherData | null,
    [string, number, number]
  >({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeatherByCoords(lat, lon),
    ...options,
  });
};
