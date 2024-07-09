import { useState } from "react";

import "./App.css";
import "./components/Fetchdata";
import Fetchdata from "./components/Fetchdata";
import GoogleLocation from "./components/GoogleLocation";
import MetricToggle from "./components/MetricToggle";

function App() {
  return (
    <>
      <MetricToggle />
      <GoogleLocation />
      <Fetchdata />
    </>
  );
}

export default App;
