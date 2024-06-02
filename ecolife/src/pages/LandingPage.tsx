// src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './LandingPage.css';
import { collection, getDocs } from 'firebase/firestore';
import VideoBackground from '../VideoBackground';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';



const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { currentUser } = useAuth(); // Ensure this line is included to get the current user
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => doc.data());
      setTestimonials(testimonialsData);
    };
    
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  };
  const handleServiceClick = (path: string) => {
    if (!currentUser) {
      setShowPopup(true);
    } else {
      navigate(path);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="landing-page">
      <nav className="navigation">
        <div className="link">
          <Link to="/">
            <img src="/assets/home.svg" alt="Home" />
            <span className="text">Home</span>
          </Link>
        </div>
        {currentUser ? (
          <>
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
      <VideoBackground />
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
        
        <section className="services">
          <h1>Our Services</h1>
          <div className="service" onClick={() => handleServiceClick('/articles')}>
            <img src="/assets/service1.jpg" alt="Educate" />
            <h3>Educate</h3>
            <p>Learn more about sustainability!</p>
          </div>
          <div className="service" onClick={() => handleServiceClick('/shop')}>
            <img src="/assets/service2.png" alt="Shop" />
            <h3>Shop</h3>
            <p>Money is donated to eco projects</p>
          </div>
          <div className="service" onClick={() => handleServiceClick('/tracking')}>
            <img src="/assets/service3.png" alt="Tracking" />
            <h3>Tracking</h3>
            <p>Go green</p>
          </div>
        </section>
          {/* Popup for login prompt */}
          {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>You need to login first</h2>
              <button onClick={closePopup} className="close-btn">Close</button>
              <Link to="/login" onClick={closePopup} className="login-link">Login now</Link>
            </div>
          </div>
        )}

        <section className="newsletter">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Get 10% OFF</h2>
              <p>Subscribe to our newsletter and get 10% off in our shop!</p>
            </div>
            <div className="newsletter-input">
              <input type="email" placeholder="Your Email Address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </section>

        <section className="testimonials-carousel">
          <h2>Clients Talk</h2>
          <div className="testimonial-card">
            {testimonials.length > 0 ? (
              <div className="testimonial-content">
                <div className="testimonial-text">
                  <h3>{testimonials[currentTestimonial].userName}</h3>
                  <p className="text">{testimonials[currentTestimonial].text}</p>
                </div>
              </div>
            ) : (
              <p>No testimonials available</p>
            )}
            <div className="testimonial-navigation">
              <button onClick={prevTestimonial}>←</button>
              <button onClick={nextTestimonial}>→</button>
            </div>
          </div>
        </section>

        <footer className="footer bg-dark text-light py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p><a href="mailto:lifeeco18@yahoo.com" className="text-light">Email Us</a></p>
                <p>Call Us</p>
              </div>
              <div className="col-md-4">
                <h5>Connect</h5>
                <div className="d-flex">
                  <a href="#" className="text-light me-3"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="text-light"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
            <div className="footer-bottom mt-4">
              <p className="mb-0">Copyright © 2023. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;