import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeContent from './HomeContent';
import FunComponent from './FunComponent';
import InteractiveComponent from './InteractiveComponent';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/fun" element={<FunComponent />} />
      <Route path="/interactive" element={<InteractiveComponent />} />
    </Routes>
  );
}

export default MainContent;