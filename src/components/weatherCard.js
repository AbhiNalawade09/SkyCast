const WeatherCard = ({ data }) => {
    const { name, sys, weather, main, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
    return (
      <div className="weather-card" style={{
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
        width: "300px",
        color: "#111",
        textAlign: "left"
      }}>
        <h2>
          {name}, {sys.country}
        </h2>
        <img src={iconUrl} alt={weather[0].description} />
        <p className="description">{weather[0].main} ({weather[0].description})</p>
        <p>🌡️ Temperature: {main.temp}°C</p>
        <p>💧 Humidity: {main.humidity}%</p>
        <p>💨 Wind Speed: {wind.speed} m/s</p>
      </div>
    );
  };

export default WeatherCard;
