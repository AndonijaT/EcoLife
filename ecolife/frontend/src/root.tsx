// src/Root.tsx
import React from 'react';
import App from './App';
import { AuthProvider } from './AuthContext';

const Root: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
