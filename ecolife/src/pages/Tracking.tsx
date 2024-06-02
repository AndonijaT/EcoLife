// src/pages/Tracking.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tracking.css';

const Tracking: React.FC = () => {
  const navigate = useNavigate();

  const handleFootClick = () => {
    navigate('/calculator'); // Update with your calculator page path
  };

  return (
    <div className="tracking-page">
      <div className="tracking-content">
        <h1>What is your Ecological Footprint?</h1>
        <p>How many planets do we need if everybody lives like you?</p>
        <p>When is your personal Overshoot Day?</p>
        <button className="foot-button" onClick={handleFootClick}>
          <img src="/assets/foot-icon.png" alt="Take the first step" /> {/* Update with your foot image path */}
        </button>
      </div>
    </div>
  );
};

export default Tracking;
