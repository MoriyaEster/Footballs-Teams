import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TeamCard from "../components/TeamCard";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-6">Favorite Football Teams</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((team) => (
            <TeamCard key={team.team.id} team={team} />
          ))}
        </div>
      ) : (
        <p className="text-3xl mt-3">No favorite teams yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
