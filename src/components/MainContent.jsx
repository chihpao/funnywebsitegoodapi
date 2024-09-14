import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeContent from './HomeContent';
import JokeComponent from './JokeComponent';
import MemeComponent from './Memecomponent';
import InteractiveComponent from './InteractiveComponent';

function MainContent() {
  return (
    <main className="p-0">
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/joke" element={<JokeComponent />} />
        <Route path="/meme" element={<MemeComponent />} />
        <Route path="/interactive" element={<InteractiveComponent />} /> 
      </Routes>
    </main>
  );
}

export default MainContent;