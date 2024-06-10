import React, { useState, useEffect } from 'react';
import './ScrollPopupShop.css';

const ScrollPopupShop: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleScroll = () => {
    if (!isClosed && window.scrollY > 200) {
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

  const handleClose = () => {
    setIsClosed(true);
    setShowPopup(false);
  };

  return (
    showPopup && !isClosed ? (
      <div className="scroll-popup-shop">
        <button className="close-button" onClick={handleClose}>×</button>
        <p>🌿 Discover Our Eco-Friendly Range! 🌿</p>
        <p>Explore sustainable and environmentally-friendly products. Make a positive impact on the planet today!</p>
        <p>Shop now and join us in making a difference.</p>
      </div>
    ) : null
  );
};

export default ScrollPopupShop;
