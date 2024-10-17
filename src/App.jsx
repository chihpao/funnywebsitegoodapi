import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderTop from './styles/HeaderTop';
import NavBar from './styles/NavBar';
import MainContent from './pages/MainContent';

function App() {
  return (
    <Router>
        <div>
          <HeaderTop />
          <NavBar />
          <MainContent />
        </div>
    </Router>
  );
}

export default App;