import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuestionnairePage from "./pages/QuestionnairePage";
import BudgetPage from "./pages/BudgetPage";
import CreditPage from "./pages/CreditPage";
import TipsPage from "./pages/TipsPage";

// Import Components
import Navbar from "./Components/navbar";

// Import Tailwind CSS
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/credit" element={<CreditPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
