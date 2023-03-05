import { DEFAULT_UNITS } from '../index.js';
import { locateCurrentUser, fetchCityCoords } from '../api/locationData.js';
import WeatherCard from './WeatherCard.js';
import ForecastCard from './ForecastCard.js';

class SearchForm {
    constructor() {
        this._searchContainer = document.querySelector('#search-container');
        this._units = localStorage.getItem('units') || DEFAULT_UNITS;
        this._render();
    }

    _render() {
        this._searchContainer.innerHTML = `
            <form id="search-form" class="flex justify-center items-center text-2xl text-slate-500 gap-8">
                <input type="text" name="city" placeholder="City Name" autocomplete="off"
                class="flex-auto w-20 py-1 px-3 border-2 border-slate-200 rounded-md shadow-sm outline-none">
                <button id="search-city" type="submit" 
                class="flex-none text-slate-400 -ml-20 bg-white py-1 px-2 hover:text-slate-500">
                    <i class="fa-solid fa-magnifying-glass pointer-events-none"></i>
                </button>
                <button id="locate-user" class="flex-none text-3xl ml-2 hover:text-slate-700 hover:scale-110 transition-transform">
                    <i class="fa-solid fa-location-crosshairs pointer-events-none"></i>
                </button>
                <button id="toggle-units" class="flex-none text-3xl hover:text-slate-700 hover:scale-110 transition-transform">
                    <i class="fa-solid fa-temperature-empty pointer-events-none"></i>
                </button>
            </form>`;

        this._inputField = document.querySelector('input');
        this._searchCityBtn = document.querySelector('#search-city');
        this._locateUserBtn = document.querySelector('#locate-user');
        this._toggleUnitsBtn = document.querySelector('#toggle-units');
        this._addEventListeners();
    }

    _addEventListeners() {
        this._searchCityBtn.addEventListener(
            'click',
            this._getCoords.bind(this)
        );
        this._locateUserBtn.addEventListener(
            'click',
            this._getCoords.bind(this)
        );
        this._toggleUnitsBtn.addEventListener(
            'click',
            this._toggleUnits.bind(this)
        );
    }

    async _getCoords(e) {
        e.preventDefault();

        // Search by city name
        if (e.target.id === 'search-city') {
            // Input cannot be blank
            if (this._inputField.value === '') {
                alert('City cannot be blank.');
                return;
            }

            try {
                // Get city coordinates
                let coords = await fetchCityCoords(this._inputField.value);
                // Save coordinates
                this._saveCoords(coords.lat, coords.lon);
            } catch (error) {
                console.error('Invalid input.');
                return;
            }

            // Clear search field
            this._inputField.value = '';

            // Update page
            this._updateCards();
            return;

            // Search by current user location
        } else if (e.target.id === 'locate-user') {
            try {
                // Get user coordinates
                let coords = await locateCurrentUser();
                // Save coordinates
                this._saveCoords(coords.lat, coords.lon);
            } catch (error) {
                console.error(
                    'Unable to get current location, ensure location services are enabled.'
                );
                return;
            }

            // Update page
            this._updateCards();
            return;
        }
    }

    _saveCoords(lat, lon) {
        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);
    }

    _toggleUnits(e) {
        e.preventDefault();

        this._units === 'metric'
            ? (this._units = 'imperial')
            : (this._units = 'metric');

        // Save selected units
        localStorage.setItem('units', this._units);

        // Update page
        this._updateCards();
        return;
    }

    _updateCards() {
        new WeatherCard();
        new ForecastCard();
        return;
    }
}

export default SearchForm;
