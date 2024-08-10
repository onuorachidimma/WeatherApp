import { useState } from "react";
import clouds from "../assets/images/clouds.png";
import rain from "../assets/images/rain.png";
import drizzle from "../assets/images/drizzle.png";
import mist from "../assets/images/mist.png";
import snow from "../assets/images/snow.png";
import sunny from "../assets/images/sunny.png";
import clear from "../assets/images/clear.png";
import searchIcon from "../assets/images/searchicon.svg";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const apiKey = "77fbc8aa4b1792e9142b52bebcc4928e";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].main),
      });
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clouds":
        return clouds;
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Drizzle":
        return drizzle;
      case "Mist":
        return mist;
      case "Snow":
        return snow;
      case "Sunny":
        return sunny;
      default:
        return "images/unknown.png";
    }
  };

  return (
    <div className="bg-blue-200 m-8 w-10/12 md:w-6/12">
      <p className="text-center text-4xl md:text-5xl font-bold m-8 text-gray-700">
        Weather App
      </p>
      <div className=" text-white p-4 rounded w-[100%] mx-auto bg-current shadow-custom-shadow">
        {weatherData && (
          <div className=" w-11/12  md:w-9/12 mx-auto ">
            <div className="flex align-center justify-center gap-[20px] md-gap-[40px]  text-gray-800 mb-4 border-b">
              <div className="w-[50%] md:w-[30%] h-auto">
                <img
                  src={weatherData.icon}
                  className="w-[100%] h-[100%]"
                  alt="Weather Icon"
                />
              </div>
              <div className="flex flex-col align-center justify-center ">
                <h1 className="text-4xl md:text-7xl font-bold">
                  {weatherData.temp}°C
                </h1>
                <p className="capitalize">{weatherData.description}</p>
              </div>
            </div>

            <div className="flex justify-center gap-[50px] mb-12 text-black">
              <div>
                <p className="">Location</p>
                <h2 className="text-xl font-bold">{weatherData.name}</h2>
              </div>
              <div className="w-[1px] border"></div>
              <div>
                <p className="">Humidity</p>
                <p className="text-xl font-bold">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex align-center justify-center">
          <input
            className={`text-black  bg-transparent outline-0 border rounded border-gray-500 pl-4 text-gray-400 ${
              weatherData
                ? "py-2 text-xl w-7/12 border-2 "
                : "py-4 text-2xl w-10/12 md:w-7/12 lg:w-6/12 border-4 "
            }`}
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={handleInputChange}
          />
          <button onClick={fetchWeatherData}>
            <img
              className={`${
                weatherData ? "w-[30px] h-[30px]" : "w-[50px] h-[50px]"
              }`}
              src={searchIcon}
              alt="Search"
            />
          </button>
        </div>

        {error && (
          <div className="text-center ">
            <p className="text-red-700 ">Invalid city name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
