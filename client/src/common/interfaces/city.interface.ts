export interface City {
  city: string;
  country: string;
  lat: string;
  lon: string;
}

export interface RawCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}
