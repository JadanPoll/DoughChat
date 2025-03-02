import axios from "axios";

const SERVER_IP_ADDR = "http://3.145.180.241:3333"; // Replace with actual backend IP

// ✅ REGISTER FUNCTION
export const registerUser = async (email, password) => {
  try {
    const bodyparam = {
        email: email,
        plaintext_password: password
    };

    console.log("BODY: " + bodyparam);

    const response = await axios.post(`${SERVER_IP_ADDR}/user/create`, 
        bodyparam
    );

    console.log("User registered:", response.data);
    return response.data; // Return data (e.g., JWT token)
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);

  }
};

// ✅ LOGIN FUNCTION
export const loginUser = async (name, password) => {
  try {

    const response = await axios.post(`${SERVER_IP_ADDR}/user/login`, {
      name,
      password,
    });

    const token = response.data; // Get JWT token from response
    localStorage.setItem("token", token); // Save token in local storage

    console.log("User logged in:", response.data);

    // redirect

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    alert("Invalid credentials. Check your email and password")

  }
};
