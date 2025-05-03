// How to run = node 5_weather_app.js
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fded29f8e5a08964b135c6a2199c6ccf`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found. Please check the city name.");
    }
    const weatherData = await response.json();
    console.log(`\nWeather Information: `);
    console.log(`City: ${weatherData.name}`);
    console.log(`Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)}°C`);
    console.log(`Description: ${weatherData.weather[0].description}`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Wind Speed: ${weatherData.wind.speed} m/s\n`);
  } catch (error) {
    console.error(error);
  }
};

const city = await rl.question(`Enter a city name to get its weather : `);
await getWeather(city);
rl.close();