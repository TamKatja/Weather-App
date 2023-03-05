import { API_URL } from '../index.js';

// Get current user coordinates
function locateCurrentUser() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) =>
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                }),
            (error) => reject(console.warn('Location services disabled.')),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    });
}

// Convert city name to coordinates
async function fetchCityCoords(city) {
    try {
        const response = await fetch(
            `${API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`
        );
        const data = await response.json();
        if (data.length === 0) {
            alert(`${city} not found.`);
            return;
        } else {
            return { lat: data[0].lat, lon: data[0].lon };
        }
    } catch (error) {
        console.error(error);
    }
}

export { locateCurrentUser, fetchCityCoords };
