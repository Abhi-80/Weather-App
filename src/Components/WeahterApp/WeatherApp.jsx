import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchWeatherData = async (city) => {
        setIsLoading(true);
        try {
            const apiKey = "d773f5c6019243a423c15f79d7301c1a";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setWeatherData(null);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Failed to fetch weather data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchWeatherData(city);
        }
    }, [city]);

    return (
        <div className='container'>
            <div className='top-bar'>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="cityInput"
                    placeholder='Enter city name'
                />
                {/* <button onClick={() => fetchWeatherData(city)}>Search</button> */}
            </div>
            <div className="weather">
                <div className='weather-data'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : weatherData ? (
                        <div>
                            <h2>Weather in {weatherData.name}</h2>
                            <p>Temperature: {weatherData.main.temp} °C</p>
                            <p>Description: {weatherData.weather[0].description}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
