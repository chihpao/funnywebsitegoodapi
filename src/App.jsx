import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './styles/NavBar';
import MainContent from './pages/MainContent';

function App() {
  return (
    <Router>
      <NavBar />
      <MainContent />
    </Router>
  );
}

export default App;