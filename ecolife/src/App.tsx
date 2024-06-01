import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Articles from './pages/Articles';
import Tracking from './pages/Tracking';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './AuthContext';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
