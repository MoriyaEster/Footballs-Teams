import React, { useState, useEffect } from "react";
import apiClient from "../services/api";

function HomePage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await apiClient.get("/teams", {
          params: {
            league: 39,
            season: 2022,
          },
        });
        setTeams(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((item) => (
        <div
          key={item.team.id}
          className="p-4 bg-white shadow rounded-lg flex items-center"
        >
          <img src={item.team.logo} alt={item.team.name} className="h-12 w-12 mr-4" />
          <h2 className="text-lg font-bold">{item.team.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default HomePage;