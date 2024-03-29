import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
    faMagnifyingGlass,
    faLocationCrosshairs,
    faTemperatureEmpty,
    faLocationDot,
    faCloudBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSmog,
    faTornado,
    faSun,
    faMoon,
    faCloud,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faMagnifyingGlass,
    faLocationCrosshairs,
    faTemperatureEmpty,
    faLocationDot,
    faCloudBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSmog,
    faTornado,
    faSun,
    faMoon,
    faCloud
);

dom.watch();

import './css/style.css';
import SearchForm from './components/SearchForm.js';
import WeatherCard from './components/WeatherCard.js';
import ForecastCard from './components/ForecastCard.js';

const API_URL = 'https://api.openweathermap.org';
const API_KEY = process.env.API_KEY;

// Default coordinates on inital page load
const DEFAULT_LAT = -31.953512;
const DEFAULT_LON = 115.857048;

// Default temperatures units
const DEFAULT_UNITS = 'metric';

new SearchForm();
new WeatherCard();
new ForecastCard();

// Get weather conditions symbol
function getWeatherSymbol(symbolEl, symbolId, dayOrNight, symbolSize) {
    symbolEl.className = '';
    symbolEl.classList.add('fa-solid', `${symbolSize}`);
    switch (true) {
        case symbolId < 300:
            symbolEl.classList.add('fa-cloud-bolt', 'text-white');
            break;
        case symbolId < 500:
            symbolEl.classList.add('fa-cloud-rain', 'text-white');
            break;
        case symbolId < 600:
            symbolEl.classList.add('fa-cloud-showers-heavy', 'text-white');
            break;
        case symbolId < 700:
            symbolEl.classList.add('fa-snowflake', 'text-white');
            break;
        case symbolId < 781:
            symbolEl.classList.add('fa-smog', 'text-white');
            break;
        case symbolId < 800:
            symbolEl.classList.add('fa-tornado', 'text-white');
            break;
        case symbolId === 800 && dayOrNight === 'day':
            symbolEl.classList.add('fa-sun', 'text-yellow-200');
            break;
        case symbolId === 800 && dayOrNight === 'night':
            symbolEl.classList.add('fa-moon', 'text-yellow-100');
            break;
        default:
            symbolEl.classList.add('fa-cloud', 'text-white');
    }
    return;
}

export {
    API_URL,
    API_KEY,
    DEFAULT_LAT,
    DEFAULT_LON,
    DEFAULT_UNITS,
    getWeatherSymbol,
};
