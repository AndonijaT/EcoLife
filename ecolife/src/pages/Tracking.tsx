// src/pages/Tracking.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tracking.css';

const Tracking: React.FC = () => {
  const navigate = useNavigate();

  const handleFootClick = () => {
    navigate('/quiz'); // Update with your quiz page path
  };

  return (
    <div className="tracking-page">
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
