import { useEffect, useState } from "react";
import axios from "axios";
import Fetchdata from "./Fetchdata";
import Autocomplete from "react-google-autocomplete";

const GoogleLocation = () => {
  const [input, setInput] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [location, setLocation] = useState("");

  const fetchLocation = async () => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`
      );
      const coords = response.data[0];
      setCoordinates({
        lat: parseFloat(coords.lat.toFixed(2)),
        lng: parseFloat(coords.lon.toFixed(2)),
      });
      setLocation(`${coords.name}, ${coords.state}, ${coords.country}`);
      console.log(loc);
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAutofille = (place) => {
    console.log(place);
    if (place && place.formatted_address) {
      setInput(place.formatted_address);
      fetchLocation(place.formatted_address);
    }
  };

  const handleButtonClick = () => {
    fetchLocation();
  };

  return (
    <div>
      <form>
        <div id="values">
          <div id="googlelocation">
            {/* <div className="autocomplete-wrapper">
              <Autocomplete
                apiKey={import.meta.env.VITE_API_KEY}
                onPlaceSelected={handleAutofille}
                placeholder="Google auto location"
              />
            </div> */}
          </div>
          <input
            placeholder="Search a specific location"
            id="location"
            value={input}
            onChange={handleChange}
          />
          <button
            id="fetchDataButton"
            type="button"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </div>
        <div>
          {location ? (
            <div>
              <h1>Location</h1>
              <p>
                The coordinates for <strong> {location}</strong> are
              </p>
              <p>Latitude: {coordinates.lat}</p>
              <p>Longitude: {coordinates.lng}</p>
              <Fetchdata coordinates={coordinates} />
            </div>
          ) : (
            <h1>Please enter a location to populate their data</h1>
          )}
        </div>
      </form>
    </div>
  );
};

export default GoogleLocation;
