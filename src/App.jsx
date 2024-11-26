import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './styles/NavBar';
import MainContent from './pages/MainContent';
import SkinnyFooter from './components/SkinnyFooter';


function App() {
  return (
    <Router>
        <div>
          <NavBar />
          <MainContent />
          <SkinnyFooter />
        </div>
    </Router>
  );
}

export default App;