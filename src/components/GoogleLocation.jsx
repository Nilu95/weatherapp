import { useEffect, useState } from "react";
import axios from "axios";
import Fetchdata from "./Fetchdata";

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

  const handleChange = (value) => {
    setInput(value);
  };

  const handleButtonClick = () => {
    fetchLocation();
  };

  return (
    <div>
      <form>
        <input
          placeholder="Search a location"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button type="button" onClick={handleButtonClick}>
          Fetch Location
        </button>
        <div className="border">
          
          {location ? (
            <div>
              <h1>Location</h1>
              <p>
                The coordinates for <strong> {location}</strong> are Latitude:
                {coordinates.lat}, Longitude: {coordinates.lng}
              </p>
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

{
  /* <p>
The coordinates for <strong> {location}</strong> are Latitude:
{coordinates.lat}, Longitude: {coordinates.lng}
</p>
<Fetchdata coordinates={coordinates} /> */
}
