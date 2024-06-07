import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Games from "./Games";
import GameInfo from "./GameInfo";
import Teams from "./Teams";
import TeamStats from "./TeamStats";
import Standings from "./Standings";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:gameId" element={<GameInfo />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:teamId" element={<TeamStats />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
