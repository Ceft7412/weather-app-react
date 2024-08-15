import React, { useState, useEffect } from "react";
import axios from "axios";
import { spawn } from "child_process";

type Weather = {
  current: {
    temp_c: number;
    temp_f: number;
    wind_mph: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
  };
} | null;

function App() {
  const [weather, setWeather] = useState<Weather>(null);
  const [width, setWidth] = useState<number>(50);
  const [city, setCity] = useState<string | null>(""); // Default city
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<string>("C");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://api.weatherapi.com/v1/current.json", {
          params: {
            key: import.meta.env.VITE_WEATHER_API,
            q: city,
          },
        });

        setWeather(response.data);
      } catch (err) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);
  console.log("weather: ", weather);

  console.log(import.meta.env.VITE_WEATHER_API);
  return (
    <>
      <main className="relative min-h-screen flex  justify-center">
        <div className="flex flex-col items-center gap-10 w-[70%]">
          <section className="flex gap-2 text-neutral-600 font-medium text-[20px] mt-20">
            <input
              type="text"
              className={`border-b w-[500px] border-neutral-300 resize-none outline-none`}
              onChange={(e) => setCity(e.target.value)}
              value={city || ""}
              placeholder="Enter country and city name"
            />
          </section>
          <section className="relative flex-1 flex flex-col justify-center items-center mb-48 w-full">
            {weather ? (
              <>
                <div className="flex flex-col items-center">
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                  />
                </div>
                {unit === "C" ? (
                  <h2 className="text-[50px] font-medium">{weather.current.temp_c}°C</h2>
                ) : (
                  <h2 className="text-[50px] font-medium">{weather.current.temp_f}°F</h2>
                )}
                <span className="text-neutral-400 font-medium text-[16px]">
                  It's {weather.current.condition.text.toLowerCase()} in{" "}
                  {weather.location.name}, {weather.location.country}
                </span>
              </>
            ) : (
              <span className="font-medium text-[26px] text-neutral-500">
                Oops! No location yet.
              </span>
            )}
            <div className="absolute right-32 flex flex-col">
              <span className="text-[26px] font-medium text-neutral-500 flex flex-col">
                {weather?.current.wind_mph} <span className="text-[15px]">mph</span>
              </span>
              <span className="text-[26px] font-medium text-neutral-500 flex flex-col">
                {weather?.current.humidity}% <span className="text-[15px]">Humidity</span>
              </span>
            </div>
          </section>
        </div>
        <div className="absolute bottom-20 flex text-[22px] font-medium gap-5 text-neutral-500">
          <button
            type="button"
            className={` transition-colors duration-300 ${
              unit === "C" ? "text-black" : "hover:text-neutral-400"
            }`}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <div>|</div>
          <button
            type="button"
            className={` transition-colors duration-300 ${
              unit !== "C" ? "text-black" : "hover:text-neutral-400"
            }`}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>
        <span className="absolute bottom-20 right-20 font-medium text-neutral-400">
          Cedrick Caceres
        </span>
      </main>
    </>
  );
}

export default App;
