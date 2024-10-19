import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import './../styles/Tracking.css';
import './../styles/LandingPage.css'; // Import the LandingPage styles to reuse

const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleFootClick = () => {
    navigate('/quiz'); // Update with your quiz page path
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="tracking-page landing-page">
      <nav className="navigation">
        {currentUser ? (
          <>
          <div className="link">
              <Link to="/">
                <img src="/assets/home.svg" alt="Home" />
                <span className="text">Home</span>
              </Link>
            </div>
            <div className="link">
              <Link to="/articles">
                <img src="/assets/article.svg" alt="Articles" />
                <span className="text">Articles</span>
              </Link>
            </div>
            <div className="link">
              <Link to="/shop">
                <img src="/assets/shop.svg" alt="Shop" />
                <span className="text">Shop</span>
              </Link>
            </div>
            
            <div className="link">
              <Link to="/profile">
                <img src="/assets/login.svg" alt="Profile" />
                <span className="text">Profile</span>
              </Link>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div className="link">
            <Link to="/login">
              <img src="/assets/login.svg" alt="Login" />
              <span className="text">Login</span>
            </Link>
          </div>
        )}
      </nav>
      <div className="tracking-content">
        <h1>"Calculate your ecological footprint!"</h1>
        <p>Take your first step!</p>
        <button className="foot-button" onClick={handleFootClick}>
          <img src="/assets/footprintt.png" alt="Take the first step" /> {/* Update with your foot image path */}
        </button>
      </div>
    </div>
  );
};

export default Tracking;
