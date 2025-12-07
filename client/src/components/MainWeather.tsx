import { type FC, useState } from "react";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

import { parseWeatherData, getWeatherIconUrl } from "../utiles";

import type { DisplayWeather, WeatherData } from "../common/interfaces";

interface MainWeatherProps {
  data: WeatherData;
}

const MainWeather: FC<MainWeatherProps> = ({ data }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const isDayTime =
    data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset;

  const parsedData: DisplayWeather | null = parseWeatherData(data);

  if (!parsedData) return <div>No data to show</div>; // TODO: improve loading and no data states

  return (
    <div
      className={clsx(
        "bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl text-black flex flex-col justify-between",
        isMobile ? "w-full" : "w-[65%]"
      )}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-wide">
          {parsedData.city}, {parsedData.country}
        </h1>
        <p className="text-sm opacity-70 mt-1 mb-4">
          {parsedData.date.toDateString()}
        </p>
        <p className="text-lg font-semibold uppercase text-black">
          {parsedData.description.toUpperCase()}
        </p>
      </header>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-start">
          <span className="text-8xl font-extrabold leading-none">
            {Math.round(parsedData.temperature)}
          </span>
          <span className="text-4xl font-bold mt-2">°C</span>
        </div>

        <img
          src={getWeatherIconUrl(
            parsedData.description.toLowerCase(),
            isMobile ? false : !isHovering,
            isDayTime
          )}
          alt={parsedData.description}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="w-28 h-28 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
        />
      </div>

      <p className="text-base text-right opacity-80 mb-6">
        Feels like:{" "}
        <span className="font-semibold">
          {Math.round(parsedData.feelsLike)}°C
        </span>
      </p>

      <hr className="border-t border-white/20 mb-6" />
      <h2 className="text-xl font-semibold mb-4 text-black">
        Details & Atmosphere
      </h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-base">
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Humidity:</span>
          <span className="font-bold">{parsedData.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Pressure:</span>
          <span className="font-bold">{parsedData.pressure} hPa</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Wind:</span>
          <span className="font-bold">{parsedData.windSpeed} m/s</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Direction:</span>
          <span className="font-bold">{parsedData.windDirection}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Clouds:</span>
          <span className="font-bold">26%</span>
        </div>
      </div>

      <hr className="border-t border-white/20 mt-6 mb-6" />
      <h2 className="text-xl font-semibold mb-4 text-black">Day Cycle</h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-base">
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Sunrise:</span>
          <span className="font-bold">{parsedData.sunriseTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium opacity-80">Sunset:</span>
          <span className="font-bold">{parsedData.sunsetTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
