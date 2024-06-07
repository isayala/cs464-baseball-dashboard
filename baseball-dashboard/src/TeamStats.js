import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import "./TeamStats.css";
import Teams from "./Teams";

const TeamStats = () => {
  const { teamId } = useParams();
  const [teamStats, setTeamStats] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      const options = {
        method: "GET",
        url: "https://api-baseball.p.rapidapi.com/teams/statistics",
        params: {
          league: "1",
          season: "2024",
          team: teamId,
        },
        headers: {
          "x-rapidapi-key": process.env.React_App_API_KEY,
          "X-RapidAPI-Host": "api-baseball.p.rapidapi.com",
        },
      };

      try {
        console.log(`Fetching data for teamId: ${teamId}`);
        const response = await axios.request(options);
        console.log("API response:", response.data);

        if (response.data.response) {
          setTeamStats(response.data.response);
        } else {
          throw new Error("No data found for this team");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching team stats:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, [teamId]);

  useEffect(() => {
    if (teamStats) {
      const ctx = document.getElementById("teamStatsChart");
      const wins = teamStats.games.wins.all.total;
      const losses = teamStats.games.loses.all.total;

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Wins", "Lossses"],
          datasets: [
            {
              label: "Wins / Losses",
              data: [wins, losses],
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responseive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
  }, [teamStats]);

  if (error) return <div>Error: {error}</div>;

  if (loading) return <p>Loading...</p>;
  if (!teamStats) return <p>No team statistics available</p>;

  const { team, games, points } = teamStats;

  return (
    <div className="stats-container">
      <h1 className="team-info">{team.name}</h1>
      <img src={team.logo} alt={team.name} />
      <div className="stats-grid">
        <h2>Games Played</h2>
        <p>Home: {games.played.home}</p>
        <p>Away: {games.played.away}</p>
        <p>Total: {games.played.all}</p>

        <div className="wins">
          <h2>Wins</h2>
          <p>
            Home: {games.wins.home.total} ({games.wins.home.percentage})
          </p>
          <p>
            Away: {games.wins.away.total} ({games.wins.away.percentage})
          </p>
          <p>
            Total: {games.wins.all.total} ({games.wins.all.percentage})
          </p>
        </div>

        <div className="losses">
          <h2>Losses</h2>
          <p>
            Home: {games.loses.home.total} ({games.loses.home.percentage})
          </p>
          <p>
            Away: {games.loses.away.total} ({games.loses.away.percentage})
          </p>
          <p>
            Total: {games.loses.all.total} ({games.loses.all.percentage})
          </p>
        </div>

        <div className="points">
          <h2>Points</h2>
          <p>
            For (Home): {points.for.total.home} (Avg: {points.for.average.home})
          </p>
          <p>
            For (Away): {points.for.total.away} (Avg: {points.for.average.away})
          </p>
          <p>
            For (All): {points.for.total.all} (Avg: {points.for.average.all})
          </p>
          <p>
            Against (Home): {points.against.total.home} (Avg:{" "}
            {points.against.average.home})
          </p>
          <p>
            Against (Away): {points.against.total.away} (Avg:{" "}
            {points.against.average.away})
          </p>
          <p>
            Against (All): {points.against.total.all} (Avg:{" "}
            {points.against.average.all})
          </p>
        </div>
      </div>
      <div className="chart">
        <canvas id="teamStatsChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default TeamStats;
