import React, { useState, useEffect } from "react";
// import axios from "axios";
import bgImage from "./assets/sunset.jpg";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  async function fetchWeatherData(location) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setWeatherData(data);
      }
      setLocation("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(location);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Faisalabad");
  }, []);

  console.log(weatherData);

  return (
    <div className="app">
      <div className="bg-image">
        <img src={bgImage} alt="" />
      </div>

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          placeholder="Enter Location"
          onChange={(event) => setLocation(event.target.value)}
        />
        {/* <button type="submit">Search</button> */}
      </form>

      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
          </div>

          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>

          <div className="temp">
            {weatherData.main ? (
              <h1>{(((weatherData.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
            ) : null}
          </div>

          <div className="description">
            {weatherData.weather ? <h2>{weatherData.weather[0].main}</h2> : null}
          </div>
        </div>

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {(((weatherData.main.feels_like - 32) * 5) / 9).toFixed()}°C
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
