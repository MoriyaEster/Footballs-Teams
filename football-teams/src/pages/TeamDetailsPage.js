import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api";
import { Link } from "react-router-dom";

import grayLike from "/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/pages/gray_like.png";
import redLike from "/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/pages/red_like.png"; 

function TeamDetailsPage() {
  const { id } = useParams(); // Get team ID from URL
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

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

  const isFavorite = () => {
    return favorites.some((fav) => fav.team.id === parseInt(id));
  };

  const toggleFavorite = () => {
    if (isFavorite()) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.team.id !== parseInt(id));
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      const newFavorite = {
        team: {
          id: teamDetails.team.id,
          name: teamDetails.team.name,
          logo: teamDetails.team.logo,
        },
        venue: teamDetails.venue, // Include venue info if needed
      };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  if (loading) {
    return <p>Loading team details...</p>;
  }

  if (!teamDetails) {
    return <p>No details available for this team.</p>;
  }

  return (
    <div
      className="team-details"
      style={{
        backgroundImage: 'url("/assets/stadium_background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Team Information */}
      <h1 style={{ fontSize: "2.5rem", color: "limegreen", marginBottom: "10px" }}>
        {teamDetails.team.name}
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <img
          src={teamDetails.team.logo}
          alt={teamDetails.team.name}
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginBottom: "10px" }}
        />
        <button
          onClick={toggleFavorite}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <img
            src={isFavorite() ? redLike : grayLike}
            alt={isFavorite() ? "Remove from favorites" : "Add to favorites"}
            style={{ width: "30px", height: "30px" }}
          />
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Founded:</strong> {teamDetails.team.founded}
        </p>
        <p>
          <strong>Country:</strong> {teamDetails.team.country}
        </p>
        {teamDetails.venue && (
          <>
            <p>
              <strong>Stadium:</strong> {teamDetails.venue.name}
            </p>
            <p>
              <strong>City:</strong> {teamDetails.venue.city}
            </p>
          </>
        )}
      </div>

      {/* Players List */}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Players:</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {players.length > 0 ? (
          players.map((player, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {player.player.name} - {player.statistics[0]?.games.position || "N/A"}
            </li>
          ))
        ) : (
          <p>No players available for this team.</p>
        )}
      </ul>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          bottom: "20px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>
          Favorite Teams
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
      </div>
    </div>
  );
}

export default TeamDetailsPage;
