import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Shop.css';
import VideoBackground from '../VideoBackground';
import { SocialIcon } from 'react-social-icons'


interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      <VideoBackground videoSrc="/assets/background-shop.mp4" overlayText="Shop" />
       <main>
        <div className="shop-products">
          {currentProducts.map((product, index) => (
            <div key={index} className="product-card">
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </a>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
            &lt;
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= products.length} className="pagination-btn">
            &gt;
          </button>
        </div>
        <br />
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
            <p className="mb-0 text-center">Copyright © 2024. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Shop;
