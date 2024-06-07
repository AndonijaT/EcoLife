import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollPopup.css';

const ScrollPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 200) { // Adjust the scroll value as needed
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    navigate('/tracking'); // Update with your tracking page path
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup ? (
      <div className="scroll-popup">
        <button className="close-button" onClick={handleClose}>×</button>
        <p>How sustainable are you? Find out today!</p>
        <button onClick={handleClick}>Visit our tracking page</button>
      </div>
    ) : null
  );
};

export default ScrollPopup;
