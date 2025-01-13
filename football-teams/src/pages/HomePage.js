import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import apiClient from "../services/api";
import TeamCard from "../components/TeamCard";

function HomePage() {
  const [allTeams, setAllTeams] = useState([]); // All unique teams fetched so far
  const [loading, setLoading] = useState(true); // Loading state
  const [displayedTeams, setDisplayedTeams] = useState([]); // Teams displayed on the current page
  const [page, setPage] = useState(1); // Current page number
  const [league, setLeague] = useState(36); // Current league ID being fetched
  const uniqueTeamIds = useRef(new Set()); // Global Set to track unique team IDs
  const TEAMS_PER_PAGE = 24; // Number of teams per page

  /**
   * Fetch teams for the given league and add unique teams to the global list.
   */
  const fetchTeams = async (leagueToFetch) => {
    try {
      const response = await apiClient.get("/teams", {
        params: {
          league: leagueToFetch,
          season: 2021,
        },
      });

      const newTeams = [];
      response.data.response.forEach((team) => {
        // Add the team only if it's not already in the Set
        if (!uniqueTeamIds.current.has(team.team.id)) {
          uniqueTeamIds.current.add(team.team.id); // Mark the team ID as added
          newTeams.push(team); // Add the team to the list of new teams
        }
      });

      if (newTeams.length > 0) {
        setAllTeams((prev) => [...prev, ...newTeams]); // Update allTeams state with new unique teams
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  /**
   * Handle infinite scroll and fetch the next page or league if needed.
   */
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (displayedTeams.length < allTeams.length) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      } else {
        setLeague((prevLeague) => prevLeague + 1); // Move to the next league
      }
    }
  }, 200);

  /**
   * Load teams whenever the league changes.
   */
  useEffect(() => {
    setLoading(true); // Set loading while fetching new league data
    fetchTeams(league);
  }, [league]);

  /**
   * Update displayed teams whenever the page or allTeams state changes.
   */
  useEffect(() => {
    const startIndex = (page - 1) * TEAMS_PER_PAGE;
    const endIndex = startIndex + TEAMS_PER_PAGE;

    setDisplayedTeams(allTeams.slice(0, endIndex)); // Display the next set of teams
  }, [page, allTeams]);

  /**
   * Attach the scroll event listener for infinite scrolling.
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [allTeams, displayedTeams]);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-green-600 mb-6">Football Teams</h2>
      {loading ? (
        <p className="text-3xl mt-3">Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedTeams.map((team, index) => (
            <TeamCard key={index} team={team} /> 
          ))}
        </div>
      )}
      {allTeams.length === 0 && !loading && <p className="text-3xl mt-3">No teams available.</p>}
    </div>
  );
}

export default HomePage;