# Weather App

## Description:

Web-based weather application that fetches real-time weather data for a specified location using the [OpenWeatherMap API](https://openweathermap.org/api).

Users can search by their current location or by city name and recieve information on that location's current temperature and conditions, as well as the forecasted midday temperature and conditions for the next several days.

💻 See [live application.](https://weather-app-hn7g.onrender.com/)

▶️ See [video preview.](https://www.youtube.com/watch?v=pE2T-F_sCgc)

This single-page application is built using Vanilla JavaScript, HTML, Tailwind CSS and Webpack. Weather condition icons are obtained from the Font Awesome API and the application design is mobile-responsive.

<br>

## Directory and File Contents:

-   `src/` - Contains application source code.

    -   `api/` - Contains code for asynchronous functions that fetch API data.

        -   `locationData.js` - Defines the _locateCurrentUser()_ function which uses the browser's in-built geolocation API to get the user's current coordinates (requires location services to be enabled). Also defines the _fetchCityCoords()_ function which uses OpenWeatherMap's Geocoding API to convert a searched city name into coordinates.

        -   `weatherData.js` - Defines the _fetchWeatherData()_ function which uses the OpenWeatherMap's 'Current Weather Data' and '5 Day / 3 Hour Forecast' APIs to obtain real-time data.

    -   `components/` - Contains code for UI class components, each of which encapsulates HTML, CSS and JavaScript.

        -   `ForecastCard.js` - Defines the _ForecastCard_ class. The _render()_ method calls the _fetchWeatherData()_ function to get predicted weather data for the specified location and generates HTML to display this. Depending on the data recieved, 4-5 cards are generated which display the forecast date, predicted midday temperature and conditions for that location. The _getDailyWeatherPrediction()_ method sorts API data, calculating the local time of each forecast, removing any predictions for the current day and returning an array of forecast objects, each of which include the predicted midday weather conditions for a future date.

        -   `SearchForm.js` - Defines the _SearchForm_ class. The _render()_ method generates HTML for the search-box, search button, user location button and toggle units button. The _addEventListener()_ method adds event-handlers to each of the above. The _getCoords()_ method responds to user input and calls either the _fetchCityCoords()_ function or the _locateCurrentUser()_ function to get location coordinates. The _saveCoords()_ method saves these coordinates to local storage. The _toggleUnits()_ method allows the user to toggle between metric and imperial units and saves their preference to local storage. The _updateCards_ button instantiates new _WeatherCard_ and _ForecastCard_ objects to update the page.

        -   `WeatherCard.js` - Defines the _WeatherCard_ class. The _render()_ method calls the _fetchWeatherData()_ function to get current weather data for the specified location and generates HTML to display this. Data displayed includes the location name, current date and time, current temperature and current conditions. The _getDatetimeUTC()_ method returns the UCT date and time of data collection (i.e. current time). The _getDatetimeLocal()_ method returns the date and time of data collection with respect to the specified location's timezone. The _getSunriseUTC()_ and _getSunsetUTC()_ methods return the UTC date and time of sunrise and sunset at the specified location respectively. The _setDayorNight()_ method toggles the page's background color depending on whether the specified location's current time falls between sunrise and sunset or not.

    -   `css/` - Contains CSS stylesheets.

        -   `style.css` - Main stylesheet to be loaded into bundle. Imports webfont CSS and Tailwind directives.

        -   `webfonts.css` - Stylesheet for webfont.

    -   `fonts` - Contains webfont files.

    -   `index.html` - Main HTML template.

    -   `index.js` - Main JavaScript file. Imports components and instantiates new objects on page load. Imports CSS and Font Awesome icons. Defines and exports global contants. Also defines the _getWeatherSymbol()_ function to style and display the appropriate Font Awesome weather icon.

-   `.gitignore` - Specifies untracked files.

-   `package.json` and `package-lock.json` - Contains project metadata, including dependencies.

-   `postcss.config.js`- Postcss configuration file (Tailwind CSS installed as a PostCSS plugin).

-   `tailwind.config.js`- Tailwind CSS configuration file.

-   `webpack.config.js`- Webpack configuration file.

<br>

## How to Install:

1. Clone or download this repository.
2. Register for a free API key at [OpenWeatherMap API](https://openweathermap.org/api).
3. Create a `.env` file in the root and add your API_KEY.
4. Run `npm install` to install application dependencies.
5. Within `webpack.config.js` change from 'production' to 'development' mode.
6. Run `npm run dev` to start up a development server on http://localhost:3000/.

<br>

## Application Screenshots:

<br>

![Weather-App screenshot day](https://user-images.githubusercontent.com/110285021/223334462-e6207a94-c399-4938-9584-d8f2b6396f05.png)

<br>

![Weather-App screenshot night](https://user-images.githubusercontent.com/110285021/223334259-a68939b3-960d-448f-92c6-e340e690841e.png)
