import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // Added search icon import
import {
  WiThermometer,
  WiRaindrop,
  WiCloud,
  WiStrongWind,
  WiSnow,
} from "react-icons/wi";
import { getWeatherData } from "../api/weatherService";

export default function WeatherApp() {
  const [city, setCity] = useState("Pune");
  const [searchTerm, setSearchTerm] = useState(city);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setLoading(true);
      setError("");
      try {
        const data = await getWeatherData(city);
        setWeather(data);
        console.log("weather", data);
      } catch (error) {
        setError("Failed to fetch weather data. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div
      className="flex flex-col md:flex-row w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/sunny.jpg')" }}
    >
      <div className="md:w-7/10 w-full md:h-full h-4/10 flex flex-col justify-end p-20 text-white bg-opacity-100">
        {weather ? (
          <div className="flex items-end gap-4">
            <h1 className="text-6xl font-bold mb-2">{weather.temperature}°C</h1>
            <div className="flex flex-col">
              {" "}
              <p className="text-3xl">{weather.city}</p>
              <p className="text-lg">{weather.formattedTime}</p>
            </div>
            <span className="text-5xl">☀️</span>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <div className="md:w-3/10 w-full md:h-full h-6/10 p-6 flex flex-col backdrop-blur-md bg-white/30">
        <form onSubmit={handleSearch} className="mb-4 mx-6 pr-8">
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

        <div className="space-y-5 text-gray-700 mx-6 pr-8">
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
            <p>Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
}
