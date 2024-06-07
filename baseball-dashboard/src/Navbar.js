import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
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
          <Link to="/teams">Standings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
