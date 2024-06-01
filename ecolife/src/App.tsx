// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';
import Shop from './pages/Shop';
import Tracking from './pages/Tracking';

const App: React.FC = () => {

  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
