import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api";

function TeamDetailsPage() {
  const { id } = useParams(); // Get team ID from URL
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        // Fetch team details
        const teamResponse = await apiClient.get("/teams", {
          params: { id }, // Pass team ID to API
        });

        setTeamDetails(teamResponse.data.response[0]);

        // Fetch players list if supported
        const playersResponse = await apiClient.get("/players", {
          params: {
            team: id,
            season: 2023, // Example season, adjust as needed
          },
        });

        setPlayers(playersResponse.data.response);
      } catch (error) {
        console.error("Error fetching team details or players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  if (loading) {
    return <p>Loading team details...</p>;
  }

  if (!teamDetails) {
    return <p>No details available for this team.</p>;
  }

  return (
    <div className="team-details">
      {/* Team Information */}
      <img src={teamDetails.team.logo} alt={teamDetails.team.name} />
      <h1>{teamDetails.team.name}</h1>
      <p><strong>Founded:</strong> {teamDetails.team.founded}</p>
      <p><strong>Country:</strong> {teamDetails.team.country}</p>

      {/* Venue Information */}
      {teamDetails.venue && (
        <>
          <h2>Stadium Information</h2>
          <p><strong>Name:</strong> {teamDetails.venue.name}</p>
          <p><strong>City:</strong> {teamDetails.venue.city}</p>
        </>
      )}

      {/* Players List */}
      <h2>Players</h2>
      {players.length > 0 ? (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.player.name} - {player.statistics[0]?.games.position || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players available for this team.</p>
      )}
    </div>
  );
}

export default TeamDetailsPage;
