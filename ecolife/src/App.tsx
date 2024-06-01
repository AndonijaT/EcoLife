// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Articles from './pages/Articles';
import Tracking from './pages/Tracking';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { AuthProvider, useAuth } from './AuthContext';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.email}</p>
            <Logout />
          </div>
        ) : (
          <div>
            <p>Please log in or register.</p>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
