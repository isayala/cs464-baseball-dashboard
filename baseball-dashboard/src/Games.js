import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Games.css";

const Games = () => {
  const [Games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let currentDate = new Date().toJSON().slice(0, 10);
        const response = await axios.get(
          "https://api-baseball.p.rapidapi.com/games",
          {
            params: {
              league: 1,
              season: "2024",
              date: currentDate,
            },
            headers: {
              "X-RapidAPI-Key":
                "eb70f1f032mshe1d9dc7c83995d6p12852fjsn77a760e46065",
              "X-RapidAPI-Host": "api-baseball.p.rapidapi.com",
            },
          }
        );
        setGames(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="games-container">
      <h1>MLB Games Scheduled for Today</h1>
      <div className="games-grid">
        {Games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-info">
              <div className="teams">
                <div className="team">
                  <img
                    src={game.teams.home.logo}
                    alt={game.teams.home.name}
                    className="team-logo"
                  />
                  <p>{game.teams.home.name}</p>
                </div>
                <div className="vs">vs</div>
                <div className="team">
                  <img
                    src={game.teams.away.logo}
                    alt={game.teams.away.name}
                    className="team-logo"
                  />
                  <p>{game.teams.away.name}</p>
                </div>
              </div>
              <p className="game-time">
                Time: {new Date(game.timestamp * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
