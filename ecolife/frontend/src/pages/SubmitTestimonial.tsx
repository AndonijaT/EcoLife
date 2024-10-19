// src/pages/SubmitTestimonial.tsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitTestimonial: React.FC = () => {
  const [text, setText] = useState('');
  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await addDoc(collection(db, 'testimonials'), {
          text,
          userId: currentUser.uid,
          userName: currentUser.email,
          createdAt: new Date()
        });
        setText('');
        toast.info('Testimonial submitted successfully');
      } catch (error) {
        toast.error('Error adding document: ');
      }
    } else {
      toast.error('You need to be logged in to submit a testimonial');
    }
  };

  return (
    <div>
      <h2>Submit a Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your testimonial here"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SubmitTestimonial;
