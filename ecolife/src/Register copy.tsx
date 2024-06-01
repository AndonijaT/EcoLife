// src/Register.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Register.css'; // Import the CSS file for styling

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registered successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
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
  );
};

export default Register;
