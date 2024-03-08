import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import InputSearch from "./components/InputSearch";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState();

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };

  const error = () => {};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  

  useEffect(() => {
    if (coords || inputValue) {
      const APIKEY = "04d82729529b21d95349b17089c4b561";
  
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?${
          inputValue ? `q=${inputValue}` : `lat=${coords.lat}&lon=${coords.lon}`
        }&appid=${APIKEY}`)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(0);
          const fahrenheit = ((9 / 5) * celsius + 32).toFixed(0);
          setTemp({
            celsius,
            fahrenheit,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [coords, inputValue]);
  


  

  return (
    <div className="app">
      <header className="header__search">
        <InputSearch setInputValue={setInputValue} />
      </header>

      <div className="content">
        {isLoading ? <Loader /> : <WeatherCard weather={weather} temp={temp} />}
      </div>

      <div className="footer">
        <p className="author">By: Gerson Llamas</p>
        <img className="logo" src="/GLL-LOGO.jpeg" alt="GLL Logo" />
      </div>
    </div>
  );
}

export default App;
