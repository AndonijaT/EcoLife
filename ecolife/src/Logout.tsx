// src/Logout.tsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
