# Weather App

A simple weather application that allows users to fetch real-time weather information for their current location or search for a city's weather. The app uses the OpenWeatherMap API to retrieve weather data.

## Features

- **Get Current Location Weather:** Automatically fetches weather data for the user's current location.
- **Search Weather by City:** Allows users to search for the weather of any city.
- **Dynamic UI Updates:** Displays weather information dynamically with relevant icons and parameters.
- **Error Handling:** Displays appropriate messages when the city is not found or when there's a network/API issue.
- **Smooth User Experience:** Tab-based navigation for switching between "Your Weather" and "Search Weather" sections.

## Technologies Used

- **HTML5** - For structuring the web page
- **CSS3** - For styling the application
- **JavaScript (ES6+)** - For handling API requests and dynamic UI updates
- **OpenWeatherMap API** - To fetch weather data

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app
   ```
3. Open `index.html` in a browser:
   ```sh
   open index.html
   ```
   or simply double-click on `index.html` to open it in a web browser.

## Usage

1. **Grant Location Access:** Click on the "Grant Access" button to allow the app to fetch your current location and display the weather.
2. **Search for a City:** Use the search bar to enter a city's name and retrieve weather data.
3. **View Weather Details:** The app displays temperature, humidity, wind speed, and cloud coverage.
4. **Switch Tabs:** Use the "Your Weather" and "Search Weather" tabs to toggle between modes.

## File Structure

```
weather-app/
│── assets/                # Contains images and icons
│── index.html             # Main HTML file
│── styles.css             # CSS file for styling
│── index.js               # JavaScript logic for fetching and displaying weather data
│── README.md              # Project documentation
```

## Dependencies & Prerequisites

- No external dependencies are required apart from an internet connection for API calls.
- A valid API key from [OpenWeatherMap](https://openweathermap.org/api) (replace `API_key` in `index.js` with your key).
