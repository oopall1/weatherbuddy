import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (cityName: string | null) => {
  try {
    let url: string;

    if (!cityName) {
      url = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve(
            `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
        }, reject);
      });
    } else {
      url = `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    }

    if (!url) throw new Error("Unable to determine location for weather data.");

    const { data, status } = await axios.get(url);

    if (status !== 200) {
      toast.error(
        status === 404
          ? "City not found"
          : status === 401
          ? "API KEY error"
          : "An error occurred while fetching weather data"
      );
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
