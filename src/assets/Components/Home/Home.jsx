import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
  TiSocialYoutube,
  TiWeatherPartlySunny,
} from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";

const Home = () => {
  const inputRef = useRef();
  const [weatherdata, setweatherdata] = useState(null); // Initialize as null instead of false

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6cb1df5b82c4925017910ee5430bfd9a`;
      const responce = await fetch(url);
      const data = await responce.json();
      console.log(data);
      setweatherdata({
        Humidity: data.main.humidity,
        WindSpeed: data.wind.speed,
        Temperature: Math.floor(data.main.temp),
        location: data.name,
        Description: data.weather[0].description,
        Country: data.sys.country,
        Icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      setweatherdata(null); // Set to null instead of false
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="home">
      <div className="nav-container">
        <div className="home-logo">
          <TiWeatherPartlySunny />
          Clima Sence
        </div>
        <div className="Search">
          <div className="search-box">
            <input ref={inputRef} type="text" placeholder="Search for a city" />
            <IoSearchSharp
              className="search-icon"
              onClick={() => search(inputRef.current.value)}
            />
          </div>
        </div>
        <div className="country">
          <GiWorld />
          PK | °C
        </div>
      </div>

      <div className="description">
        Clima Sence provides accurate & up-to-date weather information for
        WorldWide cities. Stay informed about current conditions, forecasts, and
        weather alerts, all in one platform designed to make weather tracking
        simple and reliable.
      </div>

      <div className="duration">
        <ul>
          <li>Today</li>
          <li>Hourly</li>
          <li>Weekly</li>
          <li>Monthly</li>
          <li>Yearly</li>
          <li>Radar</li>
          <li>Alerts</li>
        </ul>
      </div>

      {weatherdata ? (
        <div className="temp-container">
          <p className="top-p">
            Today's Forecast for {weatherdata.location} , {weatherdata.Country}
          </p>
          <img
            className="weather-icon"
            src={weatherdata.Icon}
            alt="weather icon"
          ></img>
          <p className="icon-desc">{weatherdata.Description}</p>
          <div className="info-container">
            <p className="city">City : {weatherdata.location} </p>
            <p className="temprature">
              Temperature : {weatherdata.Temperature} °C
            </p>
          </div>

          <div className="weather-data">
            <div className="col">
              <WiHumidity className="icon" />
              <div>
                <span>{weatherdata.Humidity} %</span>
                <p className="data"> Humidity</p>
              </div>
            </div>
            <div className="col">
              <FaWind className="icon" />
              <div>
                <span>{weatherdata.WindSpeed} Km/h</span>
                <p className="data"> Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}

      <div className="footer">
        <div className="row">
          <div className="column">
            <div className="footer-logo">
              <TiWeatherPartlySunny />
              Clima Sence
            </div>
            <p>
              Clima Sence provides accurate & up-to-date weather information for
              Pakistan cities. Stay informed about current conditions, forecasts,
              and weather alerts.
            </p>
          </div>

          <div className="column">
            <h3>Contact Us </h3>
            <p> Office </p>
            <p>G-8/4 Islamabad</p>
            <p>Contact no : +92 321 5326953</p>
            <p className="email">Email: info@climasence.com</p>
          </div>

          <div className="social">
          <h3>Follow Us </h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialYoutube />
              </a>
            </li>
          </ul>
        </div>

        </div>
<hr></hr>
<p className="copyright"> All Rights Reserved.</p>
       
      </div>
    </div>
  );
};

export default Home;
