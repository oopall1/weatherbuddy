import { type FC } from "react";
import type { WeatherData } from "../common/interfaces";
import WeatherCard from "./WeatherCard";

interface NextDaysProps {
  data: WeatherData[];
}

const NextDays: FC<NextDaysProps> = ({ data }) => {
  return (
    <div>
      <h2>Next Days Forecast</h2>
      {data.map((dayData) => (
        <WeatherCard key={dayData.dt} data={dayData} />
      ))}
    </div>
  );
};

export default NextDays;
