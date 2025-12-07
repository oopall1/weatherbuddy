# 🌤️ WeatherBuddy - Modern Weather Application

WeatherBuddy is a sleek weather application built with **React** and **Tailwind CSS**. It fetches real-time current weather and 5-day forecast data using the **OpenWeatherMap API**. It features a modern "frosted glass" UI aesthetic and leverages coordinates for reliable location search.

---

## ✨ Features

- **Current Weather Display:** Shows temperature, city, country, detailed atmosphere stats (humidity, wind, pressure), and day cycle (sunrise/sunset).
- **5-Day Forecast:** Displays weather conditions and temperatures for the next five days.
- **Location Detection:** Automatically fetches weather for the user's current location using `navigator.geolocation` on initial load.
- **City Search:** Allows users to search for weather data by city name.
- **Coordinate-Based Fetching:** When selecting a city from suggestions, the application uses **precise coordinates** instead of the city name string, ensuring accurate data retrieval and avoiding "city not found" errors.
- **Modern Design:** Utilizes Tailwind CSS to implement a **"frosted glass"** (backdrop blur) user interface.

---

## 🚀 Getting Started

Follow these steps to get your copy of WeatherBuddy up and running on your local machine.

### Prerequisites

You need **Node.js** and **pnpm** installed on your machine.

You also need an API key from **OpenWeatherMap**.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/oopall1/weatherbuddy.git
    cd weatherbuddy
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a file named `.env` in the client directory of the project. Add your OpenWeatherMap API key:

    ```
    VITE_WEATHER_API_KEY="YOUR_OPENWEATHERMAP_API_KEY_HERE"
    ```

4.  **Run the application:**

    ```bash
    pnpm run dev
    ```

    The application should now be running at `http://localhost:5173`.

---

## ⚙️ Project Structure

The key files and directories are organized as follows:

```
weatherbuddy/
├──client/
│ ├── src/
│ │ ├── common/
│ │ │ ├── hooks/
│ │ │ │ └── queries/ # React Query custom hooks (useWeather, useForecastWeather, etc.)
│ │ │ ├── interfaces/ # TypeScript interfaces (WeatherData, City, etc.)
│ │ │ ├── types/ # Custom types (WeatherQuery)
│ │ │ └── api/ # Core functions for API calls (getCities, getWeather, etc.)
│ │ ├── components/
│ │ │ ├── MainWeather.tsx # Current Weather Card
│ │ │ ├── NextDays.tsx # Forecast Cards Container
│ │ │ └── SearchBar.tsx # Search input and suggestion handler
│ │ ├── utiles/ # Helper functions
│ │ └── App.tsx # Main application component and state management
│ ├── public/
│ │ │── images/
│ │ │ └── background.jpg # Background image for the UI
│ │ │── icons/
│ │ │ ├── static/ # Static weather icons for the UI
│ │ │ └── animated/ # Animated weather icons for the UI
│ └── package.json
├──README.md
```

---

## 💻 Core Technologies

- **React:** Frontend library for building the user interface.
- **TypeScript:** Used for type safety throughout the project.
- **Axios:** Promise-based HTTP client for API requests.
- **React Query (TanStack Query):** Used for fetching, caching, synchronizing, and updating server state (weather data).
- **Tailwind CSS:** Utility-first CSS framework for rapid styling and responsive design.
- **OpenWeatherMap API:** Data source for weather information.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request.
