// 語言: JavaScript (React)
// 檔案位置: /src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SkinnyFooter from './components/SkinnyFooter';
import HomePage from './pages/HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './pages/FunComponent';
import InteractiveComponent from './pages/InteractiveComponent';
import API from './pages/API';
import LoadingPage from './pages/LoadingPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div translate="no">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fun" element={<FunComponent />} />
          <Route path="/fun/memes" element={<MemesPage />} />
          <Route path="/fun/cats" element={<CatsPage />} />
          <Route path="/fun/dogs" element={<DogsPage />} />
          <Route path="/interactive" element={<InteractiveComponent />} />
          <Route path="/api" element={<API />} />
        </Routes>
        <SkinnyFooter />
      </div>
    </Router>
  );
}

export default App;