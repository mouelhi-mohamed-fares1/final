import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from "./components/authPage";
import LeavesPage from './components/leavesPage';
import RegisterPage from "./components/registerPage"

const App = () => {
  return (
    <Router>
      <div>
        <h1>Leave Management System</h1>
        <Routes>
        <Route path="/login" element={<AuthPage  />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/leaves" element={<LeavesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
