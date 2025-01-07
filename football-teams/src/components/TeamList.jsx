import React from "react";
import { Link } from "react-router-dom";

const TeamList = ({ teams, loading, addToFavorites }) => {
  return (
    <div className="min-h-screen bg-stadium flex flex-col items-center">
      <h1 className="text-4xl text-primary font-bold mt-8">Football Teams</h1>
      {loading ? (
        <p className="text-white text-lg mt-10">Loading teams...</p>
      ) : (
        <div className="flex flex-wrap justify-center mt-8 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="w-48 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Link to={`/team/${team.id}`}>
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-16 h-16 mb-2"
                />
                <h3 className="text-center text-lg text-black font-semibold">
                  {team.name}
                </h3>
              </Link>
              <button
                onClick={() => addToFavorites(team)}
                className="mt-2 bg-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Add to Favorites ❤️
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link to="/favorites" className="text-white font-semibold underline">
          Favorite Teams
        </Link>
      </div>
    </div>
  );
};

export default TeamList;
