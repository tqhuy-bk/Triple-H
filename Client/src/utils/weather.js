const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_MAP_KEY;

export const weatherFocast = async (position, callback) => {
  const { lng, lat } = position;

  try {
    if (position) {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&appid=${WEATHER_API_KEY}&lang=vi&units=metric`
      );
      const res = await data.json();
      callback(res);
    }
  } catch (err) {
    // console.log(err);
  }
};
