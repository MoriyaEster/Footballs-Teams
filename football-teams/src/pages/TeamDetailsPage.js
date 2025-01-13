import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import apiClient from "../services/api";
import TeamCard from "../components/TeamCard";

function HomePage() {
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedTeams, setDisplayedTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [league, setLeague] = useState(36);

  const TEAMS_PER_PAGE = 16;

  const fetchTeams = async (leagueToFetch) => {
    try {
      const response = await apiClient.get("/teams", {
        params: {
          league: leagueToFetch,
          season: 2023,
        },
      });

      // Deduplicate teams using a Map
      setAllTeams((prevTeams) => {
        const teamMap = new Map(prevTeams.map((team) => [team.team.id, team]));
        response.data.response.forEach((team) => {
          if (!teamMap.has(team.team.id)) {
            teamMap.set(team.team.id, team);
          }
        });
        return Array.from(teamMap.values());
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams(league);
  }, [league]);

  useEffect(() => {
    if (allTeams.length) {
      const startIndex = (page - 1) * TEAMS_PER_PAGE;
      const endIndex = startIndex + TEAMS_PER_PAGE;

      setDisplayedTeams(allTeams.slice(0, endIndex));
    }
  }, [page, allTeams]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (displayedTeams.length >= allTeams.length) {
          setLeague((prevLeague) => prevLeague + 1);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allTeams, displayedTeams]);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-6">Football Teams</h2>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedTeams.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
      )}
      {allTeams.length === 0 && !loading && <p>No teams available.</p>}
    </div>
  );
}

export default HomePage;