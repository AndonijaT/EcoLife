// src/components/NewsletterForm.tsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewsletterForm.css';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'subscribers'), { email });
      setEmail(''); // Clear the input field
      toast.success('Subscribed successfully!');
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="newsletter-content">
      <div className="newsletter-text">
        <h2>Fancy reading?</h2>
        <p>Subscribe to our monthly newsletter!</p>
      </div>
      <form onSubmit={handleSubmit} className="newsletter-input">
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewsletterForm;
