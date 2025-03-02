import React, { useState } from "react";
import { loginUser } from "../api"; // Import the function

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    if (!name || !password) {
      alert("Please enter a username and password.");
      return;
    }

    try {
      const response = await loginUser(name, password);
      if (response) {
        alert("Login successful! Redirecting...");
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button> {/* Calls the function */}
    </div>
  );
}

export default Login;
