import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";
import { debounce } from "lodash";


function HomePage() {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [favorites, setFavorites] = useState([]); // For managing favorites
  const [page, setPage] = useState(1);
  const TEAMS_PER_PAGE = 10;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await apiClient.get("/teams", {
        params: {
          league: 39, 
          season: 2023, 
        },
      });
      setAllTeams(response.data.response); // Save all teams in state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
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
          ...allTeams.slice(0, endIndex),
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

  const addToFavorites = (team) => {
    if (!favorites.find((fav) => fav.team.id === team.team.id)) {
      const updatedFavorites = [...favorites, team];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist in localStorage
    } else {
      alert(`${team.team.name} is already in your favorites!`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-green-600 text-center mb-8">Football Teams</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedTeams.map((team, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/team/${team.team.id}`} className="block">
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {team.team.name}
                </h3>
              </Link>
              <button
                onClick={() => addToFavorites(team)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
      {allTeams.length === 0 && !loading && (
        <p className="text-center text-gray-500">No teams available.</p>
      )}
    </div>
  );
 
}

export default HomePage;
