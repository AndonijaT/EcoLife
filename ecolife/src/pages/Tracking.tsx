import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Tracking.css';

const Tracking: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="tracking-page">
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
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
