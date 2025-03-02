import React, { useEffect, useState } from "react";

function Dashboard() {
  const [creditScore, setCreditScore] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem("creditScore");
    console.log("Retrieved Credit Score:", storedScore); // Debugging log

    if (storedScore) {
      setCreditScore(storedScore);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {creditScore ? (
          <p className="text-xl mt-4">
            Your Credit Score: <span className="font-bold text-blue-600">{creditScore}</span>
          </p>
        ) : (
          <p className="text-xl mt-4">No credit score available. Please complete the questionnaire.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
