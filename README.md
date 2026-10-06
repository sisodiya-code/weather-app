Weather App

A simple, responsive weather app built with plain HTML, CSS and JavaScript. Search for any city and see its current weather. No frameworks, no build step.

Features
Search by city name (click Search or press Enter)
Shows city, temperature (°C), weather condition, humidity, wind speed and a weather icon
Loading spinner while data is being fetched
Clear error messages (city not found, invalid API key, no internet)
Card-based design with smooth hover effects
Works on mobile and desktop
Tech Used
HTML5
CSS3 (Flexbox, Grid, CSS variables, media queries)
JavaScript (fetch API with async/await)
OpenWeatherMap Current Weather API
Project Structure
weather-app/
├── index.html   # Page structure
├── style.css    # Styling and responsive layout
├── script.js    # API call and page updates
└── README.md    # This file
Getting Started
1. Get an API key
Sign up for free at openweathermap.org.
Copy your key from My API keys in your profile.
New keys can take up to about 2 hours to activate.
2. Add the key

Open script.js and replace the placeholder on line 14:

js
const API_KEY = "YOUR_API_KEY_HERE";

Security note: This is a frontend-only app, so the key is visible to anyone who views the code. Don't commit a key you can't afford to lose. If it gets misused, regenerate it from your OpenWeatherMap dashboard.

3. Run locally

Option A: VS Code Live Server (recommended)

Open the weather-app folder in VS Code.
Install the Live Server extension.
Right-click index.html and choose Open with Live Server.

Option B: Double-click index.html to open it in your browser.

Deploy with GitHub Pages
Push the project to a GitHub repository.
Go to Settings → Pages.
Under Build and deployment, choose Deploy from a branch.
Select the main branch and / (root) folder, then click Save.
Your site will be live at https://YOUR-USERNAME.github.io/weather-app/.
Ideas for Improvement
Add a "feels like" temperature card
Remember the last searched city with localStorage
Add a 5-day forecast using the /forecast endpoint
Add a °C / °F toggle
License

Free to use for learning and personal projects.                  
