import React from "react";
import { Link } from "react-router-dom";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="min-h-screen bg-stadium flex flex-col items-center">
      <h1 className="text-4xl text-primary font-bold mt-8">
        Favorite Football Teams
      </h1>
      {favorites.length > 0 ? (
        <div className="flex flex-wrap justify-center mt-8 gap-6">
          {favorites.map((team) => (
            <div
              key={team.id}
              className="w-48 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-16 h-16 mb-2"
              />
              <h3 className="text-center text-lg text-black font-semibold">
                {team.name}
              </h3>
              <button
                onClick={() => removeFromFavorites(team.id)}
                className="mt-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-lg mt-10">No favorite teams yet!</p>
      )}
      <div className="mt-8">
        <Link to="/" className="text-white font-semibold underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Favorites;