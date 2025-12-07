import { type FC } from "react";
import clsx from "clsx";
import { isMobile } from "react-device-detect";

import WeatherCard from "./WeatherCard";

import type { WeatherData } from "../common/interfaces";

interface NextDaysProps {
  data: WeatherData[];
}

const NextDays: FC<NextDaysProps> = ({ data }) => {
  return (
    <div className={clsx(isMobile ? "w-full" : "w-[25%]")}>
      {data.map((dayData) => (
        <WeatherCard key={dayData.dt} data={dayData} />
      ))}
    </div>
  );
};

export default NextDays;
