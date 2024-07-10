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
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${apiKey}`
      );
      const coords = response.data.results[0].geometry.location;
      setCoordinates({
        lat: parseFloat(coords.lat.toFixed(2)),
        lng: parseFloat(coords.lng.toFixed(2)),
      });
      const loc = response.data.results[0].formatted_address;
      setLocation(loc);
      console.log(response);
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
            <div className="autocomplete-wrapper">
              <Autocomplete
                apiKey={import.meta.env.VITE_API_KEY}
                onPlaceSelected={handleAutofille}
                placeholder="Google Auto location"
              />
            </div>
          </div>
          <input
            placeholder="Search a specific location "
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
