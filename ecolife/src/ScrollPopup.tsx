import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrollPopup.css';

const ScrollPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosed, setIsClosed] = useState(false); // State to track if the popup has been closed
  const navigate = useNavigate();

  const handleScroll = () => {
    if (!isClosed && window.scrollY > 200) { // Only show if not closed
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
  }, [isClosed]);

  const handleClick = () => {
    navigate('/tracking'); // Update with your tracking page path
  };

  const handleClose = () => {
    setIsClosed(true);
    setShowPopup(false);
  };

  return (
    showPopup && !isClosed ? (
      <div className="scroll-popup">
        <button className="close-button" onClick={handleClose}>×</button>
        <p>Want to find out how sustainable you are?</p>
        <button onClick={handleClick} className="popup-button">Visit our tracking page</button>
      </div>
    ) : null
  );
};

export default ScrollPopup;
