# Getting started

This is a React + Vite application

Guided steps to start this app:

- In the console type npm i or npm install
- Create an .env file in the root
- In the .env file, create the following variables:
    -VITE_API_KEY= 
    -VITE_WEATHER_API_KEY=
- Individuals will need to create a [Google(https://developers.google.com/maps/documentation/javascript/geocoding)] MapsGeocoding API key
    -Assign the API key to the variable VITE_API_KEY= in the .env file
- Create an account on [OpenWeather(https://openweathermap.org/)] and get the API
    - Assign the API key to the variable VITE_WEATHER_API_KEY= in the .env file


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
