import React, { useState, useEffect } from "react";

import grayLike from "./images/gray_like.png";
import redLike from "./images/red_like.png";

const Like = ({ team }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  //check if the team in the favorites list by it id
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    setIsFavorite(savedFavorites.some((fav) => fav.team.id === team.team.id));
  }, [team]);

  //Adds or removes the current team from the favorites list.
  const toggleFavorite = () => {
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.team.id !== team.team.id)
      : [...favorites, team];

    setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
      <img
        src={isFavorite ? redLike : grayLike}
        alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="h-8 w-8"
      />
    </button>
  );
};

export default Like;
