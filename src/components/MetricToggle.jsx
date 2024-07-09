import React from "react";
import { useState } from "react";

const MetricToggle = () => {
  const [selectedMeasurement, setSelectedMeasurement] = useState("Metric");

  const handleChange = (e) => {
    setSelectedMeasurement(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          <input
            type="radio"
            value="Metric"
            name="measurement"
            checked={selectedMeasurement === "Metric"}
            onChange={handleChange}
          />
          Metric
        </label>
        <label>
          <input
            type="radio"
            value="Emperial"
            name="measurement"
            checked={selectedMeasurement === "Emperial"}
            onChange={handleChange}
          />
          Emperial
        </label>
      </form>
    </div>
  );
};

export default MetricToggle;
