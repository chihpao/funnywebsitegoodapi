import React from 'react';
import { Link } from 'react-router-dom'; // 添加路由導航

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white">Stupid Cat</Link>
        <div className="flex space-x-4">
          <Link to="/joke" className="text-white hover:text-gray-400">View Random Joke</Link>
          <Link to="/meme" className="text-white hover:text-gray-400">View Random Meme</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;