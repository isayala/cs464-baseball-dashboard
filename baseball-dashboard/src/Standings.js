import { useEffect, useState } from "react";
import axios from "axios";
import "./Standings.css"; // Import the CSS file

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      const options = {
        method: "GET",
        url: "https://api-baseball.p.rapidapi.com/standings",
        params: {
          league: "1",
          season: "2024",
        },
        headers: {
          "x-rapidapi-key": process.env.React_App_API_KEY,
          "x-rapidapi-host": "api-baseball.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setStandings(response.data.response[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading standings: {error.message}</p>;

  const groupedStandings = standings.reduce((groups, team) => {
    const groupName = team.group.name;
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(team);
    return groups;
  }, {});

  return (
    <section className="standings">
      {Object.keys(groupedStandings).map((group) => (
        <div key={group}>
          <h2>{group}</h2>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Games Played</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win Percentage</th>
                <th>Points For</th>
                <th>Points Against</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              {groupedStandings[group].map((team) => (
                <tr key={team.team.id}>
                  <td>{team.position}</td>
                  <td>
                    <img
                      src={team.team.logo}
                      alt={team.team.name}
                      width="20"
                      height="20"
                    />{" "}
                    {team.team.name}
                  </td>
                  <td>{team.games.played}</td>
                  <td>{team.games.win.total}</td>
                  <td>{team.games.lose.total}</td>
                  <td>{team.games.win.percentage}</td>
                  <td>{team.points.for}</td>
                  <td>{team.points.against}</td>
                  <td>{team.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
};

export default Standings;
