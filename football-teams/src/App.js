import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import './index.css'


export default function App() {
  return (
    <div 
      className="bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ 
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <Router>
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <div className="text-center min-h-screen flex flex-col items-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/team/:id" element={<TeamDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
