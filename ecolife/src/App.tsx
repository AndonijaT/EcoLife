// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Shop from './pages/Shop';
import Articles from './pages/Articles';
import Tracking from './pages/Tracking';
import Login from './Login';
import Register from './Register';
import Profile from './pages/Profile';
import SubmitTestimonial from './pages/SubmitTestimonial';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider, useAuth } from './AuthContext';
import Quiz from './pages/calculator/Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavBar: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const shouldHideNavBar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/tracking' || location.pathname === '/quiz' || location.pathname === '/profile';

  if (shouldHideNavBar) return null;

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/tracking">Tracking</Link>
      {currentUser ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<ProtectedRoute component={Articles} />} />
          <Route path="/shop" element={<ProtectedRoute component={Shop} />} />
          <Route path="/tracking" element={<ProtectedRoute component={Tracking} />} />
          <Route path="/quiz" element={<ProtectedRoute component={Quiz} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/submit-testimonial" element={<ProtectedRoute component={SubmitTestimonial} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
