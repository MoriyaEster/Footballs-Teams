import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api";

import Like from "../components/Like";

function TeamDetailsPage() {
  const { id } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamResponse = await apiClient.get("/teams", {
          params: { id },
        });

        setTeamDetails(teamResponse.data.response[0]);
      } catch (error) {
        console.error("Error fetching team details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [id]);

  if (loading) {
    return <p>Loading team details...</p>;
  }

  if (!teamDetails) {
    return <p>No details available for this team.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <img
          src={teamDetails.team.logo}
          alt={teamDetails.team.name}
          className="w-32 h-32 mx-auto mb-4"
        />

        <h1 className="text-5xl font-bold text-center text-green-600 mb-6">
          {teamDetails.team.name}
        </h1>
        <p className="text-gray-800 mb-2">
          <strong>Founded:</strong> {teamDetails.team.founded || "N/A"}
        </p>
        <p className="text-gray-800 mb-6">
          <strong>Country:</strong> {teamDetails.team.country || "N/A"}
        </p>
        <Like team={teamDetails} /> 
      </div>

      {teamDetails.venue && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stadium Information</h2>
          <p className="text-gray-800 mb-2">
            <strong>Name:</strong> {teamDetails.venue.name || "N/A"}
          </p>
          <p className="text-gray-800">
            <strong>City:</strong> {teamDetails.venue.city || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default TeamDetailsPage;
