import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GameInfo.css";

const GameInfo = () => {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api-baseball.p.rapidapi.com/games/h2h`,
          {
            params: {
              season: "2024",
              league: "1",
              h2h: gameId,
            },
            headers: {
              "x-rapidapi-host": "api-baseball.p.rapidapi.com",
              "x-rapidapi-key": process.env.React_App_API_KEY,
            },
          }
        );
        if (response.data.response && response.data.response.length > 0) {
          setGameInfo(response.data.response[0]);
        } else {
          setError("No game info found");
        }
      } catch (error) {
        setError("Error fetching game details");
      } finally {
        setLoading(false);
      }
    };

    console.log(`Finding information more game: ${gameId}`);
    fetchGameDetails();
  }, [gameId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="game-info">
      {gameInfo && (
        <>
          <h2>
            {gameInfo.teams.home.name} vs {gameInfo.teams.away.name}
          </h2>
          <div className="team-logos">
            <img
              src={gameInfo.teams.home.logo}
              alt={gameInfo.teams.home.name}
            />
            <img
              src={gameInfo.teams.away.logo}
              alt={gameInfo.teams.away.name}
            />
          </div>
          <div className="scores">
            <h3>Scores</h3>
            <p>
              {gameInfo.teams.home.name}: {gameInfo.scores.home.total}
            </p>
            <p>
              {gameInfo.teams.away.name}: {gameInfo.scores.away.total}
            </p>
          </div>
          <div className="innings">
            <h3>Innings</h3>
            <p>Home: {JSON.stringify(gameInfo.scores.home.innings)}</p>
            <p>Away: {JSON.stringify(gameInfo.scores.away.innings)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameInfo;
