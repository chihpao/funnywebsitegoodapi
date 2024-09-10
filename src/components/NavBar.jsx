import React from 'react';
import { Link } from 'react-router-dom'; // 確保你使用了 react-router-dom

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white">My Funny Website</Link>
        {/* 其他導航項目 */}
      </div>
    </nav>
  );
}

export default NavBar;