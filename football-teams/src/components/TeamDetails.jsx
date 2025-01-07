import React from "react";
import { Link } from "react-router-dom";

const TeamDetails = ({ team }) => {
  return (
    <div className="min-h-screen bg-stadium flex flex-col items-center">
      <h1 className="text-4xl text-primary font-bold mt-8">{team.name}</h1>
      <div className="bg-white bg-opacity-80 p-6 mt-6 rounded-lg shadow-lg">
        <img
          src={team.logo}
          alt={team.name}
          className="w-24 h-24 mx-auto mb-4"
        />
        <div className="text-center">
          <p className="text-black font-semibold">Founded: {team.founded}</p>
          <p className="text-black font-semibold">Country: {team.country}</p>
          <p className="text-black font-semibold">
            Stadium: {team.stadium.name}, {team.stadium.city}
          </p>
        </div>
        <h2 className="mt-6 text-xl font-bold text-black text-center">
          Players:
        </h2>
        <ul className="list-disc list-inside text-black mt-2">
          {team.players.length ? (
            team.players.map((player, index) => (
              <li key={index}>{player}</li>
            ))
          ) : (
            <p>No players available for this team.</p>
          )}
        </ul>
      </div>
      <div className="mt-8 flex gap-8">
        <Link to="/" className="text-white font-semibold underline">
          Home
        </Link>
        <Link to="/favorites" className="text-white font-semibold underline">
          Favorite Teams
        </Link>
      </div>
    </div>
  );
};

export default TeamDetails;