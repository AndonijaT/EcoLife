import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './LandingPage.css';
import VideoBackground from '../VideoBackground';
import { useAuth } from '../AuthContext';

const testimonials = [
  {
    name: 'Manaf Hasan',
    title: 'Manager',
    text: 'Deforestation, and climate change, have led to a decline in biodiversity and negative impacts on ecosystems. Ecologists use a variety of methods, such as field observations, experiments, and modeling.',
    image: '/assets/man.avif',
    rating: 5
  },
  {
    name: 'Andonija Todorova',
    title: 'Founder',
    text: 'Something about ecology and sustainability.',
    image: '/assets/person2.jpg',
    rating: 4
  },
  {
    name: 'Jane Doe',
    title: 'Environmental Scientist',
    text: 'Our planet\'s health is paramount. Through sustainable practices, we can ensure a greener future for generations to come.',
    image: '/assets/person3.jpg',
    rating: 4
  },
  {
    name: 'John Smith',
    title: 'Conservationist',
    text: 'Conservation is not just about saving wildlife, it\'s about preserving our own future and the well-being of our communities.',
    image: '/assets/person4.jpg',
    rating: 5
  }
];

const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { currentUser } = useAuth(); // Ensure this line is included to get the current user

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
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
          <div className="service">
            <Link to="/articles">
              <img src="/assets/service1.jpg" alt="Educate" />
              <h3>Educate</h3>
              <p>Learn more about sustainability!</p>
            </Link>
          </div>
          <div className="service">
            <Link to="/shop">
              <img src="/assets/service2.png" alt="Shop" />
              <h3>Shop</h3>
              <p>Money is donated to eco projects</p>
            </Link>
          </div>
          <div className="service">
            <Link to="/tracking">
              <img src="/assets/service3.png" alt="Tracking" />
              <h3>Tracking</h3>
              <p>Go green</p>
            </Link>
          </div>
        </section>

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
            <div className="testimonial-content">
              <div className="testimonial-text">
                <h3>{testimonials[currentTestimonial].name}</h3>
                <p className="title">{testimonials[currentTestimonial].title}</p>
                <p className="text">{testimonials[currentTestimonial].text}</p>
              </div>
              <div className="testimonial-image">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
              </div>
            </div>
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
