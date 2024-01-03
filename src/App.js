import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game'; 
import Logo from './components/Logo';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for user data on initial render
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.name.split(' ')[0].toLowerCase()
        })
      });

      if (response.ok) {
        // Clear user data from localStorage and update state
        localStorage.removeItem('userData');
        setUser(null);
      } else {
        // Handle logout error
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              <Logo />
              {user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Logo />
              {user ? <Game user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
