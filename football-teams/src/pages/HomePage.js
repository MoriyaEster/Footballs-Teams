import React, { useState, useEffect } from "react";
import apiClient from "../services/api";


function HomePage() {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [page, setPage] = useState(1);
  const TEAMS_PER_PAGE = 10;

  const fetchTeams = async () => {
    try {
      const response = await apiClient.get("/teams", {
        params: {
          league: 39, // Example: Premier League
          season: 2022, // Example season
        },
      });
      setAllTeams(response.data.response); // Save all teams in state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (allTeams.length) {
      const totalTeams = allTeams.length;
      const startIndex = ((page - 1) * TEAMS_PER_PAGE) % totalTeams; // Loop around
      const endIndex = (startIndex + TEAMS_PER_PAGE) % totalTeams;
  
      if (startIndex < endIndex) {
        setDisplayedTeams((prev) => [...prev, ...allTeams.slice(startIndex, endIndex)]);
      } else {
        // Handle wrapping around to the start of the array
        setDisplayedTeams((prev) => [
          ...prev,
          ...allTeams.slice(startIndex, totalTeams),
          ...allTeams.slice(0, endIndex),
        ]);
      }
    }
  }, [page, allTeams]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setPage((prev) => prev + 1); // Trigger next page
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="team-list">
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        displayedTeams.map((team, index) => (
          <div key={index} className="team-card">
            <img src={team.team.logo} alt={team.team.name} />
            <h3>{team.team.name}</h3>
          </div>
        ))
      )}
    </div>
  );
 
}

export default HomePage;
