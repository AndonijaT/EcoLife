// src/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Register.css'; // Import the CSS file for styling

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirect to the landing page
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/tracking">Tracking</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="register-container">
        <div className="register-box">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </>
  );
};

export default Register;
