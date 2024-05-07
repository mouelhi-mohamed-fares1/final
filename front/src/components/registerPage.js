import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const RegisterPage = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const collectData = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, role }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error("Failed to register");
      }

      // Redirect or show success message as needed
      console.log("Registration successful");
    } catch (error) {
      console.error("Error registering:", error.message);
      // Handle registration error (e.g., display error message to the user)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    collectData();
    navigate('/login'); 

  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>

      <label htmlFor="username">Username: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          id="username"
          name="username"
        />
        
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />

        

        <label htmlFor="role">Role: </label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          type="text"
          placeholder="user or admin"
          id="role"
          name="role"
        />

        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here!
      </button>
    </div>
  );
};

export default RegisterPage;
