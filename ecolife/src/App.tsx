// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Articles from './pages/Articles';
import Tracking from './pages/Tracking';
import Login from './Login';
import Register from './Register';
import SubmitTestimonial from './pages/SubmitTestimonial';
import { AuthProvider, useAuth } from './AuthContext';

const App: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const shouldHideNavBar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!shouldHideNavBar && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/tracking">Tracking</Link>
          {currentUser ? (
            <>
              <Link to="/logout">Logout</Link>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
      </Routes>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default AppWrapper;
