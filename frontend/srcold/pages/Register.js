import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_IP_ADDR = "http://3.145.180.241:3333"; // Replace with actual backend IP

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correctly initialize navigation

  const registerUser = async () => {
    console.log("Register button clicked");
    console.log("Sending user:", name, password); // Logs user input

    try {
      const response = await axios.post(`${SERVER_IP_ADDR}/user/create`, {
        email: name,
        plaintext_password: password,
      });

      console.log("User registered successfully!", response.data);
      
      // ✅ Navigate only after the API request is successful
      navigate("/questionnaire"); 
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;
