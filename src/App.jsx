import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './styles/NavBar';
import FunComponent from './pages/FunComponent';
import HomePage from './pages/HomePage';
import InteractiveComponent from './pages/InteractiveComponent';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fun/*" element={<FunComponent />} />
        <Route path="/interactive" element={<InteractiveComponent />} />
      </Routes>
    </Router>
  );
}

export default App;