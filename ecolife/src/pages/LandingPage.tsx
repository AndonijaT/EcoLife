import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './LandingPage.css';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import VideoBackground from '../VideoBackground';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsletterForm from './../NewsletterForm'; // Import the component
import { SocialIcon } from 'react-social-icons'
import Leaderboard from '../Leaderboard';
import Carousel from 'react-bootstrap/Carousel'; // Correct import
import ScrollPopup from './../ScrollPopup'; // Import the ScrollPopup component

const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { currentUser } = useAuth();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const navigate = useNavigate();

   useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = testimonialsSnapshot.docs.map(doc => doc.data());

      const testimonialsWithUsernames = await Promise.all(testimonialsData.map(async (testimonial) => {
        const userDoc = await getDoc(doc(db, 'profiles', testimonial.userId));
        const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User';
        return { ...testimonial, userName };
      }));

      setTestimonials(testimonialsWithUsernames);
    };

    fetchTestimonials();
  }, []);

  const handleServiceClick = (path: string) => {
    if (!currentUser) {
      toast.error('You need to log in first');
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      toast.error("Error logging out:");
    }
  };

  const handleAddTestimonial = () => {
    if (currentUser) {
      navigate('/submit-testimonial');
    } else {
      toast.error('You need to log in first');
    }
  };

  return (
    <div className="landing-page">
      <nav className="navigation">
        {currentUser ? (
          <>
            <div className="link">
              <Link to="/articles">
                <img src="/assets/article.svg" alt="Articles" />
                <span className="text">Articles</span>
              </Link>
            </div>
            <div className="link" >
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
      <VideoBackground videoSrc="/assets/background-video.mp4" overlayText="EcoLife" />
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
            <p>We find the best prices for you!</p>
          </div>
          <div className="service" onClick={() => handleServiceClick('/tracking')}>
            <img src="/assets/service3.png" alt="Tracking" />
            <h3>Tracking</h3>
            <p>How sustainable are you?</p>
          </div>
        </section>

        <section className="newsletter">
          <NewsletterForm />
        </section>

        <section className="testimonials-carousel">
          <h2>Clients Talk</h2>
          <Carousel
            indicators={false}
            interval={null}
            prevIcon={<span className="carousel-control-prev-icon custom-prev" />}
            nextIcon={<span className="carousel-control-next-icon custom-next" />}
          >
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="testimonial-text">
                      <h3>{testimonial.userName}</h3>
                      <p className="text">{testimonial.text}</p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <button className="add-testimonial-btn" onClick={handleAddTestimonial}>+</button>
        </section>

        <section className="leaderboard-section">
          <Leaderboard />
        </section>
        <footer className="footer bg-dark text-light py-5">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p><a href="mailto:lifeeco18@yahoo.com" className="text-light">Email Us</a></p>
                <p><a href="tel:+123456789" className="text-light">Call Us</a></p>
              </div>
              <div className="col-md-4">
                <h5>Connect</h5>
                <div className="d-flex justify-content-center">
                  <SocialIcon url="https://www.linkedin.com/in/eco-life-bbb50b311/" className="me-3" />
                  <SocialIcon url="https://www.twitter.com" />
                </div>
              </div>
            </div>
            <p className="mb-0 text-center">Copyright © 2023. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
      <ScrollPopup /> {/* Add the ScrollPopup component here */}
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
