import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-around">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/favorites" className="hover:underline">Favorites</Link>
      </nav>
    </header>
  );
}

export default Header;
