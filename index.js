require('dotenv').config(); // Load environment variables

async function getWeatherData() {
    try {
        const apiKey = process.env.WEATHER_API_KEY; // Access API key from .env
        const location = 'Bengaluru';
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather Data:", JSON.stringify(data.current.temp_c, null, 2));
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

getWeatherData();
