import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './styles/NavBar';
import MainContent from './pages/MainContent';

function App() {

  return (
    <Router>
        <div>
          <NavBar />
          <MainContent />
        </div>
    </Router>
  );
}

export default App;