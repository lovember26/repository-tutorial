import axios from 'axios';
import {
  getMarkupWeather,
  getMarkupWeatherToWeek,
  weatherData
} from '../markups/weather-markup';
import { weatherData } from '../markups/weather-markup';

const URL = 'https://api.openweathermap.org/data/';
const API_KEY = 'ea60bf329e302f40922f2ed0631e5003'; //my key

let api;

async function getWeatherDay() {
  try {
       const response = await axios.get(`${api}`);
       weatherData.coord = response.data.coord;
       weatherData.main = response.data.main.temp;
       weatherData.name = response.data.name;
       weatherData.timezone = response.data.timezone;
       weatherData.weather = response.data.weather;
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getWeatherWeek() {
  try {
    console.log('week api');
    const res = await axios.get(`${api}`);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}


function onSuccess(position) {
  console.log('day');
  const { latitude, longitude } = position.coords;
  api = `${URL}2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  getWeatherDay().then(getMarkupWeather);
}

function onError(error) {
  api = `${URL}2.5/weather?q=London&units=metric&appid=${API_KEY}`;
  getWeatherDay().then(getMarkupWeather);
}

function onSuccessToWeek(position) {
  console.log('week ');
  const { latitude, longitude } = position.coords;
  api = `${URL}3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,hourly&appid=${API_KEY}`;
  getWeatherWeek().then(getMarkupWeatherToWeek);
}

export { onSuccess, onError };
export { onSuccessToWeek };
