import { React, useState } from "react";
import "./App.css";
import MapPackage from "./components/MapPackage";
import Dashboard from "./components/Dashboard";

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  console.log("hhhhhh", selectedDate);
  return (
    <>
      <Dashboard setSelectedDate={setSelectedDate} />
      <MapPackage selectedDate={selectedDate} />
    </>
  );
}

export default App;
