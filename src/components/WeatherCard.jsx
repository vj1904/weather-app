import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Added search icon import
import {
  WiThermometer,
  WiRaindrop,
  WiCloud,
  WiStrongWind,
  WiSnow,
} from "react-icons/wi";

export default function WeatherApp() {
  const [city, setCity] = useState("");

  return (
    <div
      className="flex flex-col md:flex-row w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/sunny.jpg')" }}
    >
      {/* Left Section (Weather Display) */}
      <div className="md:w-7/10 w-full md:h-full h-4/10 flex flex-col justify-end p-20 text-white bg-opacity-100">
        <div className="flex items-end gap-4">
          <h1 className="text-6xl font-bold mb-2">25°C</h1>
          <div className="flex flex-col">
            {" "}
            {/* Adjusted to stack city and time */}
            <p className="text-3xl">New York</p>
            <p className="text-lg">Monday, 12:00 PM</p>
          </div>
          <span className="text-5xl">☀️</span>
        </div>
      </div>

      {/* Right Section (Search & Details) */}
      <div className="md:w-3/10 w-full md:h-full h-6/10 p-6 flex flex-col backdrop-blur-md bg-white/30">
        {/* Search Location */}
        <div className="mb-4 mx-6 pr-8">
          <div className="flex items-center border-b border-gray-700 w-relative">
            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 w-full text-gray-700"
            />
            <FiSearch className="text-gray-700 text-xl ml-2" />
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-5 text-gray-700 mx-6 pr-8">
          {/* Weather Details */}
          <h3 className="text-md">Weather Details...</h3>
          <h4 className="font-bold">Thunderstorm with Light Drizzle</h4>
          <div className="flex justify-between">
            <span>Temp max</span>
            <span className="flex items-center">
              19&deg; <WiThermometer className="text-red-500" />
            </span>
          </div>
          <div className="flex justify-between">
            <span>Temp min</span>
            <span className="flex items-center">
              15&deg; <WiThermometer className="text-blue-500" />
            </span>
          </div>
          <div className="flex justify-between">
            <span>Humidity</span>
            <span className="flex items-center">
              58% <WiRaindrop />
            </span>
          </div>
          <div className="flex justify-between">
            <span>Cloudy</span>
            <span className="flex items-center">
              86% <WiCloud />
            </span>
          </div>
          <div className="flex justify-between">
            <span>Wind</span>
            <span className="flex items-center">
              5km/h <WiStrongWind />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
