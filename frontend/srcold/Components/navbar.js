import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">BudgetMaster</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/budget" className="hover:underline">Budget</Link>
          <Link to="/credit" className="hover:underline">Credit Score</Link>
          <Link to="/tips" className="hover:underline">Tips</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
