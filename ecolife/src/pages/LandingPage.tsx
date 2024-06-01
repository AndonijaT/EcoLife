import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './LandingPage.css';




const LandingPage: React.FC = () => {
  

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
      <main>
        <section className="hero">
          <h1>About us</h1>
          <p>An app that helps users reduce their footprint by educating them on sustainable practices, tracking green goals and proposing environmentally friendly products and services.</p>
        </section>

        <section className="features">
          <h1></h1>
          <h3></h3>
          <p></p>
        </section>
       
      </main>
    </div>
  );
};

export default LandingPage;
