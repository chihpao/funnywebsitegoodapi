import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SkinnyFooter from './components/SkinnyFooter';
import HomePage from './pages/HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './pages/FunComponent';
import InteractiveComponent from './pages/InteractiveComponent';
import API from './pages/apiPage';
import LoadingPage from './pages/LoadingPage';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // 檢查 pointer 是否為 fine 用來判斷是否為非觸控裝置
  const isNonTouchDevice = window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      {isNonTouchDevice && <CustomCursor />}
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