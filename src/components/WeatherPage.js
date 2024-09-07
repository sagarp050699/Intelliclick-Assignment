import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WEATHER_API_KEY = 'fee40cf40f394552abe5115ab1f97802';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function WeatherPage() {
  const { cityName, country } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${WEATHER_API_URL}?q=${cityName},${country}&appid=${WEATHER_API_KEY}&units=metric`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      setLoading(false);
    };
    fetchWeather();
  }, [cityName, country]);

  if (loading) return <p>Loading weather...</p>;
  if (!weather) return <p>No weather data found</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}, {country}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherPage;
