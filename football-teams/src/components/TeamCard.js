import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";

function TeamCard({ team }) {
  return (
    <div className="team-card bg-white rounded-lg shadow-md p-4 text-center">
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
      <Like team={team} />
    </div>
  );
}

export default TeamCard;
