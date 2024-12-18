import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainContent from './pages/MainContent';
import SkinnyFooter from './components/SkinnyFooter';
import Botpress from "./components/Botpress"; // 確保路徑正確



function App() {
  return (
    <Router>
        <div>
          <Botpress />
          <NavBar />
          <MainContent />
          <SkinnyFooter />
        </div>
    </Router>
  );
}

export default App;