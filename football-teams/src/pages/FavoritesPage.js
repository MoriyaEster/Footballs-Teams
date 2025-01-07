import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the page loads
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (teamId) => {
    const updatedFavorites = favorites.filter((team) => team.team.id !== teamId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-6">Favorite Football Teams</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-9">
          {favorites.map((team) => (
            <div
              key={team.team.id}
              className="w-80 h-80 bg-none border-gray-200 shadow-md rounded-full flex flex-col items-center"
            >
              <Link to={`/team/${team.team.id}`} className="block">
                <img
                  className="w-45 h-45 mx-auto mb-4"
                  src={team.team.logo}
                  alt={team.team.name}
                />
                <h3 className="text-lg font-medium text-gray-800">{team.team.name}</h3>
              </Link>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300"
                onClick={() => removeFromFavorites(team.team.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No favorite teams yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
