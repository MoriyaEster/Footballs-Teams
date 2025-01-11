import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api";

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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Team Information */}
      <div className="text-center">
        <img
          src={teamDetails.team.logo}
          alt={teamDetails.team.name}
          className="w-32 h-32 mx-auto mb-4"
        />

        <h1 className="text-5xl font-bold text-center text-green-600 mb-6">{teamDetails.team.name}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Founded:</strong> {teamDetails.team.founded || "N/A"}
        </p>
        <p className="text-gray-600 mb-6">
          <strong>Country:</strong> {teamDetails.team.country || "N/A"}
        </p>
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

      {/* Venue Information */}
      {teamDetails.venue && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stadium Information</h2>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> {teamDetails.venue.name || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>City:</strong> {teamDetails.venue.city || "N/A"}
          </p>
        </div>
      )}

      {/* Players List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Players</h2>
        {players.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player, index) => (
              <li
                key={index}
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <p className="font-medium text-gray-800">{player.player.name}</p>
                <p className="text-sm text-gray-600">
                  Position: {player.statistics[0]?.games.position || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No players available for this team.</p>
        )}
      </div>
    </div>
  );
}

export default TeamDetailsPage;
