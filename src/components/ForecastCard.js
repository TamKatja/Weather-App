import { DEFAULT_LAT, DEFAULT_LON, getWeatherSymbol } from '../index.js';
import fetchWeatherData from '../api/weatherData.js';

class ForecastCard {
    constructor() {
        this._forecastContainer = document.querySelector('#forecast-container');
        this._lat = localStorage.getItem('lat') || DEFAULT_LAT;
        this._lon = localStorage.getItem('lon') || DEFAULT_LON;
        this._units = localStorage.getItem('units') || DEFAULT_UNITS;
        this._render();
    }

    async _render() {
        // Clear forecast data
        this._forecastContainer.innerHTML = '';

        // Get predicted weather data
        const data = await fetchWeatherData(
            'forecast',
            this._lat,
            this._lon,
            this._units
        );

        // Generate daily forecasts
        const dailyForecasts = this._getDailyWeatherPrediction(data);

        // Create card for each day
        for (const day of dailyForecasts) {
            const div = document.createElement('div');
            div.classList.add(
                'flex',
                'flex-row',
                'md:flex-col',
                'justify-center',
                'items-center',
                'bg-white',
                'bg-opacity-30',
                'gap-10',
                'py-4',
                'px-6',
                'rounded',
                'shadow',
                'hover:scale-105',
                'transition-transform'
            );

            div.innerHTML = `

                <div class="text-md md:text-lg text-slate-500 text-center">
                    ${day.date.split('-').reverse().join('/')}
                </div>
                <i id="forecast-symbol"></i>
                <div class="flex flex-col justify-center items-center gap-1 text-slate-700">
                    
                    <div class="text-2xl md:text-4xl">${Math.round(
                        day.temp
                    )}&deg;${this._units === 'metric' ? 'C' : 'F'}</div>
                    <div class="text-md md:text-lg">${day.conditions}</div>
                </div>`;

            //  Render weather conditions symbol
            const symbolEl = div.querySelector('#forecast-symbol');
            getWeatherSymbol(symbolEl, day.symbolId, 'day', 'text-5xl');

            this._forecastContainer.appendChild(div);
        }
    }

    _getDailyWeatherPrediction(data) {
        const predictionData = data.list;

        // Convert UTC datetimes to local datetimes
        const datetimesLocal = [];
        for (const datetimeUTC of predictionData) {
            datetimesLocal.push(
                new Date((datetimeUTC.dt + data.city.timezone) * 1000)
                    .toISOString()
                    .split('T')
            );
        }

        // Get current local datetime
        const currentDatetimeLocal = new Date(
            Date.now() + data.city.timezone * 1000
        )
            .toISOString()
            .split('T');

        // Ignore prediction data for current date
        for (const datetime of datetimesLocal) {
            if (currentDatetimeLocal[0] === datetime[0]) {
                predictionData.shift();
            }
        }

        let forecasts = [];

        // Get approx midday weather predictions for future dates (3-hourly data provided).
        for (let i = 3; i < predictionData.length; i += 8) {
            const forecast = {
                temp: predictionData[i].main.temp,
                conditions: predictionData[i].weather[0].main,
                symbolId: predictionData[i].weather[0].id,
            };
            forecasts.push(forecast);
        }

        // Add forecast dates
        let forecastDates = new Set();
        for (const datetime of datetimesLocal) {
            const date = datetime[0];
            forecastDates.add(date);
        }
        forecastDates.delete(currentDatetimeLocal[0]);
        forecastDates = Array.from(forecastDates);
        forecasts.forEach((forecast, index) => {
            forecast.date = forecastDates[index];
        });

        return forecasts;
    }
}

export default ForecastCard;
