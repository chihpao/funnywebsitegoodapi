import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './styles/NavBar';
import FunComponent from './pages/FunComponent';
import HomePage from './pages/HomePage';
import InteractiveComponent from './pages/InteractiveComponent';
import LoadingPage from './pages/LoadingPage'; // 引入加載頁面組件

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      localStorage.setItem('hasLoaded', 'true');
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // 3秒後隱藏加載頁面
    }
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fun/*" element={<FunComponent />} />
            <Route path="/interactive" element={<InteractiveComponent />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;