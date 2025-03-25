import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SkinnyFooter from './components/SkinnyFooter';
import HomePage from './pages/HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './pages/FunComponent';
import InteractiveComponent from './pages/InteractiveComponent';
import AppChatbot from './pages/chatbotpage';
import API from './pages/apiPage';
import LoadingPage from './pages/LoadingPage';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const isNonTouchDevice = window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      {isNonTouchDevice && <CustomCursor />}
      <div className="min-h-screen bg-white">
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* 先把AI agent註解 */}
            {/* <Route path="/aiagent" element={<AppChatbot />} /> */}
            <Route path="/fun" element={<FunComponent />} />
            <Route path="/fun/memes" element={<MemesPage />} />
            <Route path="/fun/cats" element={<CatsPage />} />
            <Route path="/fun/dogs" element={<DogsPage />} />
            <Route path="/interactive" element={<InteractiveComponent />} />
            {/* <Route path="/api" element={<API />} /> */}
          </Routes>
        <ScrollToTop />
        <SkinnyFooter />
      </div>
    </Router>
  );
}

function App() {
  return <AppContent />;
}

export default App;