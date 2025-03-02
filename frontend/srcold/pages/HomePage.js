import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to BudgetMaster</h1>
      <p className="text-lg text-gray-700 mb-6">
        Track your budget, improve your credit, and take control of your finances.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-lg">Register</Link>
      </div>
    </div>
  );
}

export default HomePage;
