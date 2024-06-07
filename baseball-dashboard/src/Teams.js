import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Teams.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/teams.json")
      .then((response) => response.json())
      .then((data) => setTeams(data.response))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const categorizeTeams = (teams) => {
    const leagues = {
      "American League": {
        "American League East": [],
        "American League Central": [],
        "American League West": [],
      },
      "National League": {
        "National League East": [],
        "National League Central": [],
        "National League West": [],
      },
    };

    teams.forEach((team) => {
      if (team.league && team.league.startsWith("American")) {
        leagues["American League"][team.league].push(team);
      } else if (team.league && team.league.startsWith("National")) {
        leagues["National League"][team.league].push(team);
      }
    });

    return leagues;
  };

  const categorizedTeams = categorizeTeams(teams);

  const TeamCard = ({ division, teams }) => (
    <div className="card">
      <h2>{division}</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/team/${team.id}`}>
              <img src={team.logo} alt={team.name} />
              <span>{team.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="teams">
      <div className="american">
        <h2>American League</h2>
        {Object.keys(categorizedTeams["American League"]).map((division) => (
          <TeamCard
            key={division}
            division={division}
            teams={categorizedTeams["American League"][division]}
          />
        ))}
      </div>
      <div className="national">
        <h2>National League</h2>
        {Object.keys(categorizedTeams["National League"]).map((division) => (
          <TeamCard
            key={division}
            division={division}
            teams={categorizedTeams["National League"][division]}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
