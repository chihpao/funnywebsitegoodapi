import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './FunComponent';
import InteractiveComponent from './InteractiveComponent';
import LoadingPage from './LoadingPage';
function MainContent() {
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
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fun" element={<FunComponent />} />
      <Route path="/fun/memes" element={<MemesPage />} />
      <Route path="/fun/cats" element={<CatsPage />} />
      <Route path="/fun/dogs" element={<DogsPage />} />
      <Route path="/interactive" element={<InteractiveComponent />} />
    </Routes>
    </>
  );
}

export default MainContent;