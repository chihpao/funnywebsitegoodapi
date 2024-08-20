// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JokeComponent from './components/JokeComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="p-4 bg-gray-800 text-white">
          <h1 className="text-2xl">My Funny Website</h1>
        </nav>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<JokeComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
