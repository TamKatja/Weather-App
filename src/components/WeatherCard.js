import {
    DEFAULT_LAT,
    DEFAULT_LON,
    DEFAULT_UNITS,
    getWeatherSymbol,
} from '../index.js';
import fetchWeatherData from '../api/weatherData.js';

class WeatherCard {
    constructor() {
        this._weatherContainer = document.querySelector('#weather-container');
        this._lat = localStorage.getItem('lat') || DEFAULT_LAT;
        this._lon = localStorage.getItem('lon') || DEFAULT_LON;
        this._units = localStorage.getItem('units') || DEFAULT_UNITS;
        this._render();
    }

    async _render() {
        // Get current weather data
        const data = await fetchWeatherData(
            'weather',
            this._lat,
            this._lon,
            this._units
        );

        // Get UTC datetime of data
        const datetimeUTC = this._getDatetimeUTC(data);

        // Convert UTC datetime to local date and time
        const datetimeLocal = this._getDatetimeLocal(data).split('T');
        const [year, month, day] = datetimeLocal[0].split('-');
        const time = datetimeLocal[1].split(':').splice(0, 2).join(':');

        // Get UTC datetime of sunrise and sunset
        const sunriseUTC = this._getSunriseUTC(data);
        const sunsetUTC = this._getSunsetUTC(data);

        const dayOrNight = this._setDayOrNight(
            datetimeUTC,
            sunriseUTC,
            sunsetUTC
        );

        this._weatherContainer.innerHTML = `
            <div>
                <p class="text-3xl md:text-5xl text-center text-slate-700 break-all mb-3">
                    <i class="fa-solid fa-location-dot mr-4 
                    ${
                        dayOrNight === 'day'
                            ? 'text-sky-800'
                            : 'text-indigo-800'
                    }"></i>${data.name}, ${data.sys.country}
                </p>
                <p class="text-md md:text-lg text-center text-slate-500">Updated: ${day}/${month}/${year}, ${time}</p>
            </div>
            <div class="flex justify-center items-center bg-white bg-opacity-30 px-12 py-8 gap-10 rounded shadow hover:scale-105 transition-transform">
                <i id="weather-symbol"></i>
                <div class="flex flex-col justify-center items-center text-slate-700 gap-2">
                    <div class="text-4xl md:text-6xl">
                        ${Math.round(data.main.temp)}&deg;${
            this._units === 'metric' ? 'C' : 'F'
        }
                    </div>
                    <div class="text-xl md:text-2xl">
                        ${data.weather[0].main}
                    </div>
                </div>
            </div>`;

        // Get weather conditions symbol
        const symbolEl = document.querySelector('#weather-symbol');
        const symbolId = data.weather[0].id;
        getWeatherSymbol(symbolEl, symbolId, dayOrNight, '6xl');
    }

    _getDatetimeUTC(data) {
        return new Date(data.dt * 1000).toUTCString();
    }

    _getDatetimeLocal(data) {
        return new Date((data.dt + data.timezone) * 1000).toISOString();
    }

    _getSunriseUTC(data) {
        return new Date(data.sys.sunrise * 1000).toUTCString();
    }

    _getSunsetUTC(data) {
        return new Date(data.sys.sunset * 1000).toUTCString();
    }

    _setDayOrNight(datetime, sunrise, sunset) {
        // Toggle page background color
        const body = document.querySelector('body');
        if (datetime >= sunrise && datetime <= sunset) {
            body.classList.add('from-sky-200', 'to-sky-400');
            body.classList.remove('from-indigo-200', 'to-indigo-400');
            return 'day';
        } else {
            body.classList.add('from-indigo-200', 'to-indigo-400');
            body.classList.remove('from-sky-200', 'to-sky-400');
            return 'night';
        }
    }
}

export default WeatherCard;
