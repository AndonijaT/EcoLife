import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../styles/Articles.css';
import VideoBackground from '../sections/VideoBackground';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import QuotesSection from '../sections/QuotesSection';


interface Article {
  title: string;
  link: string;
  description: string;
  isNew: boolean;
}

const Popup: React.FC<{ closePopup: () => void }> = ({ closePopup }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Welcome!</h2>
        <p>Discover the latest articles about sustainable living!</p>
        <button onClick={closePopup}>Explore Now</button>
      </div>
    </div>
  );
};

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showPopup, setShowPopup] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>('http://localhost:3001/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  const articlesPerPage = 3;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * articlesPerPage;
  const selectedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { currentUser } = useAuth(); 
  const [testimonials, setTestimonials] = useState<any[]>([]);
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

  const handleAddTestimonial = () => {
    if (currentUser) {
      navigate('/submit-testimonial');
    } else {
      toast.error('You need to log in first');
    }
  };

  return (
    <div className="landing-page">
      {showPopup && <Popup closePopup={closePopup} />}
      <nav className="navigation">
        <div className="link">
          <Link to="/">
            <img src="/assets/home.svg" alt="Home" />
            <span className="text">Home</span>
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
        <div className="link">
          <Link to="/profile">
            <img src="/assets/login.svg" alt="Profile" />
            <span className="text">Profile</span>
          </Link>
        </div>
       
      </nav>
      <VideoBackground videoSrc="/assets/background-shop.mp4" overlayText="Articles" />
      <main>
        <div className="articles-section">
          <div className="articles-list">
            {selectedArticles.map((article, index) => (
              <div key={index} className="article-card">
                {article.isNew && <span className="new-badge">New</span>}
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={prevPage}>←</button>
            <button onClick={nextPage}>→</button>
          </div>
        </div>
        <br />
        <QuotesSection />
        <section className="testimonials-carousel">
          <h2>Leave an opinion</h2>
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
            <button className="add-testimonial-btn" onClick={handleAddTestimonial}>+</button>
          </div>
        </section>
        <br /><br />
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
                  <a href="https://www.linkedin.com/in/eco-life-bbb50b311/" className="text-light me-3">
                    <img src="/assets/li.png" alt="LinkedIn" />
                  </a>
                  <a href="https://www.twitter.com" className="text-light">
                    <img src="/assets/twitter.png" alt="Twitter" />
                  </a>
                </div>
              </div>
            </div>
            <p className="mb-0 text-center">Copyright © 2023. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Articles;
