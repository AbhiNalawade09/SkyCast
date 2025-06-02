import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import WeatherCard from "./components/weatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;


  const getWeatherByCity = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
  
      if (res.status === 404 || data.cod === "404") {
        setError("❌ City not found. Please try another.");
        setWeather(null);
      } else if (res.status !== 200) {
        setError("❌ Something went wrong. Try again.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("❌ Failed to fetch weather. Please check your internet.");
      setWeather(null);
    }
  
    setLoading(false);
  };
  
  const getWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch location-based weather");
    }
    setLoading(false);
  }, [apiKey]);

  
  
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      () => {
        setError("Location access denied.");
      }
    );
  } else {
    setError("Geolocation is not supported by this browser.");
  }
}, [getWeatherByCoords]);

  const getBackgroundClass = (weather) => {
    if (!weather) return "app default";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("clear")) return "app clear";
    if (main.includes("cloud")) return "app cloudy";
    if (main.includes("rain") || main.includes("drizzle")) return "app rainy";
    if (main.includes("snow")) return "app snowy";
    if (main.includes("thunderstorm")) return "app thunder";
    return "app default";
  };

  return (
    <div className={getBackgroundClass(weather)}>
      <h1>🌤️ SkyCast</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeatherByCity}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-msg">{error}</p>}
      {weather && weather.main && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
