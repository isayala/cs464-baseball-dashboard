import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import gamesLogo from "./images/games.jpg";
import teamsLogo from "./images/teams.jpg";
import standingsLogo from "./images/standings.jpg";

const Home = () => {
  return (
    <section className="home">
      <div className="shortcuts">
        <Link to="/games" className="shortcut-link">
          <img src={gamesLogo} alt="games" className="shortcut-logo" />
          <div className="image-title">Games</div>
        </Link>
        <Link to="/teams" className="shortcut-link">
          <img src={teamsLogo} alt="teams" className="shortcut-logo" />
          <div className="image-title">Teams</div>
        </Link>
        <Link to="/standings" className="shortcut-link">
          <img src={standingsLogo} alt="standings" className="shortcut-logo" />
          <div className="image-title">Standings</div>
        </Link>
      </div>
    </section>
  );
};

export default Home;
