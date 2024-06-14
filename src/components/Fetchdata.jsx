import axios from "axios";
import { useEffect, useState } from "react";

function getCardinalDirection(angle) {
  if (typeof angle === "string") angle = parseInt(angle);
  if (angle <= 0 || angle > 360 || typeof angle === "undefined") return "☈";
  const arrows = {
    north: "↑ N",
    north_east: "↗ NE",
    east: "→ E",
    south_east: "↘ SE",
    south: "↓ S",
    south_west: "↙ SW",
    west: "← W",
    north_west: "↖ NW",
  };
  const directions = Object.keys(arrows);
  const degree = 360 / directions.length;
  angle = angle + degree / 2;
  for (let i = 0; i < directions.length; i++) {
    if (angle >= i * degree && angle < (i + 1) * degree)
      return arrows[directions[i]];
  }
  return arrows["north"];
}

const Fetchdata = ({ coordinates }) => {
  const [weather, setWeather] = useState(null);

  const weathering = async () => {
    if (coordinates.lat && coordinates.lng) {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data.list[0].main);
        console.log(response);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    weathering();
  }, [coordinates]);

  return (
    <div>
      {weather ? (
        <div>
          <h1>Weather Temperature</h1>
          <p>Minimum temperature: {weather.temp_min}°C</p>
          <p>Maximum temperature: {weather.temp_max}°C</p>
          <p>Feels like: {weather.feels_like}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Pressure: {weather.pressure}mbar</p>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default Fetchdata;
