/* =========================================================
   Weather App – Logic
   Uses the OpenWeatherMap "Current Weather" API.
   ========================================================= */

/* ---------------------------------------------------------
   STEP 1: PUT YOUR API KEY HERE
   Get a free key at https://openweathermap.org/api
   (Sign up → your profile → "My API keys").
   Replace the text between the quotes below.
   NOTE: New keys can take up to ~2 hours to start working.
   --------------------------------------------------------- */
const API_KEY = "YOUR_API_KEY_HERE";

// Base URL of the API. "units=metric" gives us temperature in °C.
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

/* ---------- Grab elements from the page ---------- */
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");
const weatherSection = document.getElementById("weather");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

/* ---------- Helper functions to show/hide parts of the UI ---------- */

// Show or hide the loading spinner (and disable the button while loading)
function setLoading(isLoading) {
  loader.hidden = !isLoading;
  searchButton.disabled = isLoading;
}

// Show an error message and hide the old weather card
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  weatherSection.hidden = true;
}

// Clear any previous error message
function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
}

/* ---------- Fetch weather data from the API ---------- */
async function getWeather(city) {
  // encodeURIComponent makes names like "New York" safe to use in a URL
  const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  // The API answers with a status code. Turn bad ones into clear errors.
  if (response.status === 404) {
    throw new Error(`We couldn't find "${city}". Check the spelling and try again.`);
  }
  if (response.status === 401) {
    throw new Error(
      "The API key is invalid or not active yet. Check script.js (new keys can take up to 2 hours)."
    );
  }
  if (!response.ok) {
    throw new Error("Something went wrong on the weather service. Please try again.");
  }

  // Convert the response body from JSON text into a JavaScript object
  return response.json();
}

/* ---------- Put the data on the page ---------- */
function displayWeather(data) {
  // Data we need from the API response:
  const { name, sys, main, weather, wind: windData } = data;

  cityName.textContent = `${name}, ${sys.country}`;
  temperature.textContent = Math.round(main.temp);
  condition.textContent = weather[0].description;
  humidity.textContent = main.humidity;

  // The API gives wind in metres/second. Multiply by 3.6 to get km/h.
  wind.textContent = (windData.speed * 3.6).toFixed(1);

  // Weather icon from OpenWeatherMap (e.g. "10d" = daytime rain)
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  weatherIcon.alt = weather[0].description;

  weatherSection.hidden = false;
}

/* ---------- Handle a search ---------- */
async function handleSearch(event) {
  event.preventDefault(); // stop the form from reloading the page

  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  // Remind beginners to add their key
  if (API_KEY === "YOUR_API_KEY_HERE") {
    showError("Add your OpenWeatherMap API key at the top of script.js.");
    return;
  }

  clearError();
  weatherSection.hidden = true;
  setLoading(true);

  try {
    const data = await getWeather(city);
    displayWeather(data);
  } catch (error) {
    // fetch() throws a TypeError when there's no internet connection
    if (error instanceof TypeError) {
      showError("Network problem. Check your internet connection and try again.");
    } else {
      showError(error.message);
    }
  } finally {
    // Runs whether the request worked or failed
    setLoading(false);
  }
}

/* ---------- Listen for the search form being submitted ----------
   A form's "submit" event fires when the user clicks the Search
   button OR presses Enter inside the input box. */
form.addEventListener("submit", handleSearch);
