import { useQuery } from "@tanstack/react-query";

import { getCities } from "../../api/cities.api";

import type { City } from "../../interfaces/city.interface";

export const useCities = (query: string) => {
  return useQuery<City[], Error>({
    queryKey: ["cities", query],
    queryFn: () => getCities(query),
  });
};
