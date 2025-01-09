import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import redLike from "/home/moriyaester/Desktop/resume/Footballs-Teams/football-teams/src/pages/red_like.png";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the page loads
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (team) => {
    const updatedFavorites = favorites.filter((fav) => fav.team.id !== team.team.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="team-list">
      <h2 className="text-2xl font-bold text-center mb-6">Your Favorite Teams</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((team) => (
            <div
              key={team.team.id}
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
              {/* Clickable red_like button to remove */}
              <img
                src={redLike}
                alt="remove favorite"
                className="w-8 h-8 mx-auto cursor-pointer mt-2"
                onClick={() => removeFromFavorites(team)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite teams yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
