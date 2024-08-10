import React, { useState } from "react";
// import axios from "axios";
import bgImage from "./assets/sunset.jpg";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch(url).then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="bg-image">
        <img src={bgImage} alt="" />
      </div>

      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>
                {Math.floor(((weatherData.main.temp.toFixed() - 32) * 5) / 9)}°C
              </h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {weatherData.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
