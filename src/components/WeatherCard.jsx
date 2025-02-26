import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import {
  WiThermometer,
  WiRaindrop,
  WiCloud,
  WiStrongWind,
} from "react-icons/wi";
import { getWeatherData } from "../api/weatherService";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [searchTerm, setSearchTerm] = useState(city);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("/sunny.jpg");

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchTerm);
  };
  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        setError("Please enter a city");
        return;
      }
      setError("");
      try {
        const data = await getWeatherData(city);
        setWeather(data);
        // console.log("weather", data);
      } catch (error) {
        setError("Failed to fetch weather data. Try again.");
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    if (weather) {
      const date = new Date(weather.time);
      const hours = date.getHours();

      if (hours >= 5 && hours < 17) {
        setBackgroundImage("/morning.jpg");
      } else if (hours >= 17 && hours < 20) {
        setBackgroundImage("/evening.jpg");
      } else {
        setBackgroundImage("/night.jpg");
      }
    }
  }, [weather]);

  return (
    <div
      className="flex flex-col md:flex-row w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="md:w-6/10 w-full md:h-full h-4/10 flex flex-col justify-end p-20 text-white bg-opacity-100">
        {weather ? (
          <div className="flex items-end gap-4">
            <h1 className="text-6xl font-bold mb-2">{weather.temperature}°C</h1>
            <div className="flex flex-col">
              {" "}
              <p className="text-3xl">{weather.city}</p>
              <p className="text-lg">{weather.formattedTime}</p>
            </div>
            <span className="text-5xl">
              {{ 0: "☀️", 1: "⛅", 2: "🌧️" }[weather?.weathercode] || "❓"}
            </span>
          </div>
        ) : (
          <p>{error ? error : "Loading weather data"}</p>
        )}
      </div>

      <div className="md:w-4/10 w-full md:h-full h-6/10 p-6 flex flex-col backdrop-blur-md bg-white/30">
        <form onSubmit={handleSearch} className="mb-4 mx-12 pr-8">
          <div className="flex items-center border-b border-gray-700 w-relative">
            <input
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 w-full text-gray-700"
            />
            <button type="submit" onClick={() => setCity(searchTerm)}>
              <FiSearch className="text-gray-700 text-xl ml-2" />
            </button>
          </div>
        </form>

        <div className="space-y-5 text-gray-700 mx-12 pr-8">
          <h3 className="text-md">Weather Details...</h3>
          {weather ? (
            <div>
              <div className="flex justify-between py-3">
                <span>Temp max</span>
                <span className="flex items-center">
                  {weather.temperature}&deg;{" "}
                  <WiThermometer className="text-red-500" />
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span>Temp min</span>
                <span className="flex items-center">
                  {weather.temperature}&deg;{" "}
                  <WiThermometer className="text-blue-500" />
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span>Humidity</span>
                <span className="flex items-center">
                  58% <WiRaindrop />
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span>Cloudy</span>
                <span className="flex items-center">
                  86% <WiCloud />
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span>Wind</span>
                <span className="flex items-center">
                  {weather.windspeed}km/h <WiStrongWind />
                </span>
              </div>
            </div>
          ) : (
            <p>{error ? error : "Loading weather data"}</p>
          )}
        </div>
      </div>
    </div>
  );
}
