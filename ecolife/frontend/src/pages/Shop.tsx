import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../styles/Shop.css';
import VideoBackground from '../sections/VideoBackground';
import { SocialIcon } from 'react-social-icons';
import ScrollPopupShop from '../sections/ScrollPopupShop';


interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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

  const parsePrice = (price: string) => {
    return parseFloat(price.replace(',', '.').replace(/[^\d.-]/g, ''));
  };

  const filterProductsByPrice = (product: Product) => {
    const price = parsePrice(product.price);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Number.MAX_VALUE;
    return price >= min && price <= max;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(filterProductsByPrice)
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const aboutUs = {
    title: "Why Eco-Friendly Products Matter",
    content: "Eco-friendly products are important because they help reduce pollution, conserve resources, and protect ecosystems. By choosing sustainable products, we can minimize our environmental footprint, support ethical practices, and promote a healthier planet for future generations. Join us in making a positive impact through conscious consumption."
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
        <div className="link">
          <Link to="/articles">
            <img src="/assets/article.svg" alt="Articles" />
            <span className="text">Articles</span>
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
      <VideoBackground videoSrc="/assets/background-shop.mp4" overlayText="Shop" />
      <ScrollPopupShop />
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="price-filter">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
          />
        </div>
      </div>
      <main>
        <div className="shop-products">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <div key={index} className="product-card">
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </a>
              </div>
            ))
          ) : (
            <p>No products found in this price range.</p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
              &lt;
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-btn">
              &gt;
            </button>
          </div>
        )}


        <div className="about-section">
          <h1>{aboutUs.title}</h1>
          <p>{aboutUs.content}</p>
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
