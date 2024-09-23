import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './FunComponent';
import InteractiveComponent from './InteractiveComponent';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/fun" element={<FunComponent />} />
      <Route path="/fun/memes" element={<MemesPage />} />
      <Route path="/fun/cats" element={<CatsPage />} />
      <Route path="/fun/dogs" element={<DogsPage />} />
      <Route path="/interactive" element={<InteractiveComponent />} />
    </Routes>
  );
}

export default MainContent;