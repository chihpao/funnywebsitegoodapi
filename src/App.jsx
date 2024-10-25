import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderTop from './styles/HeaderTop';
import NavBar from './styles/NavBar';
import MainContent from './pages/MainContent';
import SkinnyFooter from './components/SkinnyFooter';

function App() {
  return (
    <Router>
        <div>
          <HeaderTop />
          <NavBar />
          <MainContent />
          <SkinnyFooter />
        </div>
    </Router>
  );
}

export default App;