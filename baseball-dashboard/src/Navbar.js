import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="logo-container">
          <img src={logo} alt="Baseball Dashboard logo" className="app-logo" />
          <span className="title">Baseball Dashboard</span>
        </li>
        <li className="menu-button" onClick={toggleMenu}>
          &#9776;
        </li>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/standings">Standings</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
