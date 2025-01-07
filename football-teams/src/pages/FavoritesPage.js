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
    <div className="team-list">
      <h2>Your Favorite Teams</h2>
      {favorites.length > 0 ? (
        favorites.map((team) => (
          <div key={team.team.id} className="team-card">
            <Link to={`/team/${team.team.id}`}>
              <img src={team.team.logo} alt={team.team.name} />
              <h3>{team.team.name}</h3>
            </Link>
            <button onClick={() => removeFromFavorites(team.team.id)}>Remove from Favorites</button>
          </div>
        ))
      ) : (
        <p>No favorite teams yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
