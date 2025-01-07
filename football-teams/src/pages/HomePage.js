import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";
import { debounce } from "lodash";


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
          league: 39, 
          season: 2022, 
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
    const handleScroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setPage((prev) => prev + 1);
      }
    }, 200); // Debounce with a 200ms delay
  
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
            <Link to={`/team/${team.team.id}`}>
              <img src={team.team.logo} alt={team.team.name} />
              <h3>{team.team.name}</h3>
            </Link>
          </div>
        ))
      )}
      {allTeams.length === 0 && !loading && <p>No teams available.</p>}
    </div>
  );
 
}

export default HomePage;
