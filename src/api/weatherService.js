import axios from "axios";

const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const getCityCoordinates = async (city) => {
  try {
    const response = await axios.get(GEO_API_URL, {
      params: { name: city, count: 1 },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    throw error;
  }
};

export const getWeatherData = async (city) => {
  try {
    const { latitude, longitude } = await getCityCoordinates(city);
    const response = await axios.get(WEATHER_API_URL, {
      params: { latitude, longitude, current_weather: true },
    });
    // console.log(response);
    const weatherData = response.data.current_weather;
    const dateObj = new Date(weatherData.time);
    const cityName = city;

    const formattedDate = `${dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })} - ${dateObj
      .toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "2-digit",
      })
      .replace(",", " ")}`;
    return {
      ...weatherData,
      city: cityName,
      formattedTime: formattedDate,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
