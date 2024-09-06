import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';

function App() {
  return (
    <Router>
      <NavBar />
      <MainContent />
    </Router>
  );
}

export default App;