import axios from "axios";
import { toast } from "react-toastify";
import type { WeatherData } from "../interfaces";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (cityName: string | null) => {
  try {
    let url: string;

    if (!cityName) {
      url = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve(
            `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
        }, reject);
      });
    } else {
      url = `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
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

export const getWeatherByCoords = async (
  latitude: number,
  longitude: number
) => {
  try {
    const url = `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

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

export const getForecastWeather = async (
  dateToExclude: Date,
  cityName: string | null,
  lat?: number,
  lon?: number
) => {
  try {
    let url: string;

    if (!cityName && !lat && !lon) {
      url = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve(
            `${API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
        }, reject);
      });
    } else if (lat !== undefined && lon !== undefined) {
      url = `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      url = `${API_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
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

    return data.list.filter(
      (dayData: WeatherData) =>
        dayData["dt_txt"]?.includes("12:00:00") &&
        dayData["dt_txt"].split(" ")[0] !==
          dateToExclude.toISOString().split("T")[0]
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
