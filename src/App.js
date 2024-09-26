// src/App.js
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Conversation from './components/Conversation';
import HelpCenterSearch from './components/HelpCenterSearch';
import ArticleDetail from './components/ArticleDetail';
import NavBar from './components/NavBar';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
  };

  const handleLogout = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const isAuthenticated = useMemo(() => !!token && !!userId, [token, userId]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Conversation userId={userId} token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/helpcenter"
            element={
              isAuthenticated ? (
                <HelpCenterSearch />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/article/:articleId"
            element={
              isAuthenticated ? (
                <ArticleDetail />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
