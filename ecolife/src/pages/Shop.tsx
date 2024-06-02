import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import VideoBackground from '../VideoBackground';

const Shop = () => {

  return (
    <div className="landing-page">
      <nav className="navigation">
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
          <Link to="/tracking">
            <img src="/assets/tracking.svg" alt="Tracking" />
            <span className="text">Tracking</span>
          </Link>
        </div>
      </nav>
      <VideoBackground videoSrc="/assets/video-shop.mp4" overlayText=" Shop " />
      <main>
        
       

       

       

        <footer className="footer">
          <div className="footer-container">
  
            <div className="footer-section">
              <h3>Support ECOLIFE</h3>
              <p>Donate today: 100% of your donation goes directly toward us</p>
              <button className="footer-donate">Donate</button>
            </div>
            
            <div className="footer-section">
              <h3>Connect</h3>
              <p>Email Us</p>
              <p>Call Us</p>
              <div className="footer-social">
                <a href="#"><img src="/assets/li.png" alt="LinkedIn" /></a>
                <a href="#"><img src="/assets/twitter.png" alt="Twitter" /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © 2023. All Rights Reserved. </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Shop;
