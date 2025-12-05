import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export const getCities = async (query: string) => {
  try {
    const url = `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}&units=metric`;
    const { data, status } = await axios.get(url);
    if (status !== 200) {
      toast.error(
        status === 401
          ? "API KEY error"
          : "An error occurred while fetching weather data"
      );
    }
    return data.map((city: any) => {
      console.log(city);
      return {
        city: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
