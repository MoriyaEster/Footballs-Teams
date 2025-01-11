import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";
import { debounce } from "lodash";

import grayLike from "/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/pages/gray_like.png";
import redLike from "/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/pages/red_like.png"; 

function HomePage() {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [favorites, setFavorites] = useState([]); // For managing favorites
  const [page, setPage] = useState(1);
  const TEAMS_PER_PAGE = 16;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchTeams = async (league, season) => {
    try {
      const response = await apiClient.get("/teams", {
        params: {
          league: league, 
          season: season,
        },
      });
      setAllTeams(response.data.response); // Save all teams in state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    let league = 35
    let season = 2021
    fetchTeams(league, season);
    league += 1
  }, []);

  useEffect(() => {
    if (allTeams.length) {
      const totalTeams = allTeams.length;
      const startIndex = ((page - 1) * TEAMS_PER_PAGE) % totalTeams; // Loop around
      const endIndex = (startIndex + TEAMS_PER_PAGE) % totalTeams;

      if (startIndex < endIndex) {
        setDisplayedTeams((prev) => [...prev, ...allTeams.slice(startIndex, endIndex)]);
      } else {
        // Handle wrapping around to the start of the array
        setDisplayedTeams((prev) => [
          ...prev,
          ...allTeams.slice(startIndex, totalTeams),
          // ...allTeams.slice(0, endIndex),
        ]);
      }
    }
  }, [page, allTeams]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setPage((prev) => prev + 1);
      }
    }, 200); // Debounce with a 200ms delay

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFavorite = (team) => {
    return favorites.some((fav) => fav.team.id === team.team.id);
  };

  const toggleFavorite = (team) => {
    if (isFavorite(team)) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.team.id !== team.team.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist in localStorage
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, team];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist in localStorage
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-6">Football Teams</h2>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedTeams.map((team, index) => (
            <div
              key={index}
              className="team-card bg-white rounded-lg shadow-md p-4 text-center"
            >
              <Link to={`/team/${team.team.id}`}>
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="h-20 w-20 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {team.team.name}
                </h3>
              </Link>
              <button onClick={() => toggleFavorite(team)} className="focus:outline-none">
                <img
                  src={isFavorite(team) ? redLike : grayLike}                  
                  alt={isFavorite(team) ? "Remove from favorites" : "Add to favorites"}
                  className="h-8 w-8 mx-auto"
                />
              </button>
            </div>
          ))}
        </div>
      )}
      {allTeams.length === 0 && !loading && (
        <p>No teams available.</p>
      )}
    </div>
  );
}

export default HomePage;

