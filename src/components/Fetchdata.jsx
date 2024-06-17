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
  const [wind, setWind] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);

  const weathering = async () => {
    if (coordinates.lat && coordinates.lng) {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`
        );
        const daily = response.data.list.filter((finding) =>
          finding.dt_txt.endsWith("00:00:00")
        );
        setDailyWeather(daily);

        setWeather(response.data.list[0].main);
        setWind(response.data.list[0].wind);
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
          <h1>Current Temperature</h1>
          <p>Temperature: {weather.temp}°C</p>
          <p>Minimum temperature: {weather.temp_min}°C</p>
          <p>Maximum temperature: {weather.temp_max}°C</p>
          <p>Feels like: {weather.feels_like}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Pressure: {weather.pressure} mbar</p>
          <p>Wind speed: {wind.speed} KMP/H</p>
          <p>Wind direction: {getCardinalDirection(wind.deg)}</p>
        </div>
      ) : (
        <h1></h1>
      )}
      {dailyWeather ? (
        dailyWeather.map((finding, index) => (
          <div key={index}>
            <h1>Data: {finding.dt_txt}</h1>
            <h3>Weather Temperature</h3>
            <p>The temperature will be: {finding.main.temp}°C</p>
            <p>The temperature will feel like: {finding.main.feels_like}°C</p>
            <p>Humidity will be: {finding.main.humidity}%</p>
            <p>Pressure will be: {finding.main.pressure}mbar</p>
            <p>Wind speed will be: {finding.wind.speed} KMP/H</p>
            <p>
              Wind direction will be: {getCardinalDirection(finding.wind.deg)}
            </p>
          </div>
        ))
      ) : (
        <h1>No data available for midnight</h1>
      )}
    </div>
  );
};

export default Fetchdata;

// <div>
//   {weather ? (
//     <div>
//       <h1>Weather Temperature</h1>
//       <p>Current temperature {weather.temp}°C</p>
//       <p>Minimum temperature: {weather.temp_min}°C</p>
//       <p>Maximum temperature: {weather.temp_max}°C</p>
//       <p>Feels like: {weather.feels_like}°C</p>
//       <p>Humidity: {weather.humidity}%</p>
//       <p>Pressure: {weather.pressure}mbar</p>
//       <p>Wind speed: {wind.speed} KMP/H</p>
//       <p>Wind direction: {getCardinalDirection(wind.deg)}</p>
//     </div>
//   ) : (
//     <h1></h1>
//   )}
// </div>
