import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Games from "./Games";
import Teams from "./Teams";
import TeamStats from "./TeamStats";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:teamId" element={<TeamStats />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
