import { API_URL, API_KEY } from '../index.js';

// Fetch (current or predicted) weather data
async function fetchWeatherData(dataType, lat, lon, units) {
    try {
        const response = await fetch(
            `${API_URL}/data/2.5/${dataType}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
        );
        const data = await response.json();
        if (!data) {
            throw new Error('Something went wrong.');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchWeatherData;
