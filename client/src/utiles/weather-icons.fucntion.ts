export const getWeatherIconUrl = (
  weatherDesc: string,
  isStatic: boolean,
  isDayTime: boolean
): string => {
  const dayOrNight = isDayTime ? "day" : "night";
  const folder = isStatic ? "static" : "animated";

  if (weatherDesc.includes("clear"))
    return `/icons/${folder}/clear-${dayOrNight}.svg`;
  else if (weatherDesc.includes("clouds")) {
    return `/icons/${folder}/cloudy-${dayOrNight}.svg`;
  } else if (weatherDesc.includes("dust") || weatherDesc.includes("sand")) {
    return `/icons/${folder}/dust.svg`;
  } else if (weatherDesc.includes("fog")) {
    return `/icons/${folder}/fog-${dayOrNight}.svg`;
  } else if (weatherDesc.includes("sleet") || weatherDesc.includes("snow")) {
    return `/icons/${folder}/snowy-${dayOrNight}.svg`;
  } else if (weatherDesc.includes("tornado")) {
    return `/icons/${folder}/tornado.svg`;
  } else if (weatherDesc.includes("thunderstorm")) {
    return `/icons/${folder}/thunderstorms-${dayOrNight}.svg`;
  } else {
    return `/icons/${folder}/rainy-${dayOrNight}.svg`;
  }
};
