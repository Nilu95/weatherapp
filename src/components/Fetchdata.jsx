import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [weatherCode, setWeatherCode] = useState(null);
  const [averageTemperature, setAverageTemperature] = useState([]);
  const [mostLikeyCode, setMostLikeyCode] = useState(null);

  const weathering = async () => {
    if (coordinates.lat && coordinates.lng) {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`
        );
        const daily = response.data.list.filter((finding) =>
          finding.dt_txt.endsWith("12:00:00")
        );

        const averageTemp = response.data.list.reduce(
          (accumalator, current) => {
            const date = current.dt_txt.split(" ")[0];
            accumalator[date] = accumalator[date] || [];
            accumalator[date].push(current.main.temp);
            console.log(accumalator[date]);
            return accumalator;
          },
          {}
        );
        console.log(averageTemp);

        const temp = Object.keys(averageTemp).reduce((acc, curr) => {
          const tempArray = averageTemp[curr];
          console.log(tempArray);

          const averageSum =
            tempArray.reduce((sum, currentValue) => sum + currentValue, 0) /
            tempArray.length;
          acc[curr] = averageSum;
          return acc;
        }, {});
        console.log(temp);

        const mostFrequentWord = (str) => {
          const words = str.toLowerCase().match(/\b\w+\b/g);
          const wordCount = {};

          words.forEach((word) => {
            wordCount[word] = (wordCount[word] || 0) + 1;
          });

          return Object.keys(wordCount).reduce(
            (maxWord, word) =>
              wordCount[word] > (wordCount[maxWord] || 0) ? word : maxWord,
            ""
          );
        };

        setAverageTemperature(temp);
        setWeather(response.data.list[0].main);
        setWind(response.data.list[0].wind);
        setDailyWeather(daily);
        setWeatherCode(response.data.list[0].weather[0]);
      } catch (error) {
        console.log("Error fetching weather data:", error);
        console.log("hello world");
      }
    }
  };

  useEffect(() => {
    weathering();
  }, [coordinates]);

  return (
    <div className="container" id="cards">
      {weather ? (
        <Card
          style={{ width: "20rem", marginLeft: "80px", marginBottom: "20px" }}
        >
          <Card.Img
            variant="top"
            src={`http://openweathermap.org/img/wn/${weatherCode.icon}@2x.png`}
          />
          <Card.Body>
            <Card.Title>Current Temperature</Card.Title>
            <Card.Text>
              <p>
                Weather:{" "}
                {weatherCode.description.charAt(0).toUpperCase() +
                  weatherCode.description.slice(1)}
              </p>
              <p>Temperature: {weather.temp}°C</p>
              <p>Minimum temperature: {weather.temp_min}°C</p>
              <p>Maximum temperature: {weather.temp_max}°C</p>
              <p>Feels like: {weather.feels_like}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Pressure: {weather.pressure} mbar</p>
              <p>Wind speed: {wind.speed} KMP/H</p>
              <p>Wind direction: {getCardinalDirection(wind.deg)}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <br />
      )}

      {dailyWeather.length > 0 ? (
        dailyWeather.map((finding, index) => (
          <Card
            key={index}
            style={{ width: "20rem", marginLeft: "80px", marginBottom: "20px" }}
          >
            <Card.Img
              variant="top"
              src={`http://openweathermap.org/img/wn/${finding.weather[0].icon}@2x.png`}
            />
            <Card.Body>
              <Card.Title>Data: {finding.dt_txt.split(" ")[0]}</Card.Title>
              <Card.Text>
                <p>
                  Weather:{" "}
                  {finding.weather[0].description.charAt(0).toUpperCase() +
                    finding.weather[0].description.slice(1)}
                </p>
                <p>
                  The Average temperature will be:{" "}
                  {averageTemperature[finding.dt_txt.split(" ")[0]].toFixed(2)}
                  °C
                </p>
                <p>Humidity will be: {finding.main.humidity}%</p>
                <p>Pressure will be: {finding.main.pressure}mbar</p>
                <p>Wind speed will be: {finding.wind.speed} KMP/H</p>
                <p>
                  Wind direction will be:{" "}
                  {getCardinalDirection(finding.wind.deg)}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <br />
      )}
    </div>
  );
};

export default Fetchdata;
