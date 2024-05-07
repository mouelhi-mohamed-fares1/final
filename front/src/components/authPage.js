import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const AuthPage = (props) => {
  const navigate = useNavigate();
  
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      let result = await fetch("http://localhost:3000/api/auth/login", {
        method: 'post',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      if (result) {
        console.log("token erroror")
        localStorage.setItem('token', JSON.stringify(result.token));
        localStorage.setItem('user', JSON.stringify(result.user));

        console.log("token erroror t3ada")
       
          } else {
        alert("Login credentials are wrong");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert("An error occurred while logging in");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(username);
     handleLogin();
      navigate('/leaves'); 
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Email/Username: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="youremail@gmail.com or username"
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
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here!</button>
    </div>
  );
};

export default AuthPage;
