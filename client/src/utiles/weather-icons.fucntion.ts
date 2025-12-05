export const getWeatherIconUrl = (
  weatherDesc: string,
  isStatic: boolean,
  isDayTime?: boolean
): string => {
  const dayOrNight = isDayTime ? "day" : "night";
  const folder = isStatic ? "static" : "animated";

  if (weatherDesc.includes("clear"))
    return isDayTime !== undefined
      ? `/icons/${folder}/clear-${dayOrNight}.svg`
      : `/icons/${folder}/clear-day.svg`;
  else if (weatherDesc.includes("clouds")) {
    return isDayTime !== undefined
      ? `/icons/${folder}/cloudy-${dayOrNight}.svg`
      : `/icons/${folder}/cloudy.svg`;
  } else if (weatherDesc.includes("dust") || weatherDesc.includes("sand")) {
    return `/icons/${folder}/dust.svg`;
  } else if (weatherDesc.includes("fog")) {
    return isDayTime !== undefined
      ? `/icons/${folder}/fog-${dayOrNight}.svg`
      : `/icons/${folder}/fog.svg`;
  } else if (weatherDesc.includes("sleet") || weatherDesc.includes("snow")) {
    return isDayTime !== undefined
      ? `/icons/${folder}/snowy-${dayOrNight}.svg`
      : `/icons/${folder}/snowy.svg`;
  } else if (weatherDesc.includes("tornado")) {
    return `/icons/${folder}/tornado.svg`;
  } else if (weatherDesc.includes("thunderstorm")) {
    return isDayTime !== undefined
      ? `/icons/${folder}/thunderstorms-${dayOrNight}.svg`
      : `/icons/${folder}/thunderstorms.svg`;
  } else {
    return isDayTime !== undefined
      ? `/icons/${folder}/rainy-${dayOrNight}.svg`
      : `/icons/${folder}/rainy.svg`;
  }
};
