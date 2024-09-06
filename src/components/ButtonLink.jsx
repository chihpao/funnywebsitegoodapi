import React from 'react';
import { Link } from 'react-router-dom';

function ButtonLink({ to, children }) {
  return (
    <Link to={to}>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        {children}
      </button>
    </Link>
  );
}

export default ButtonLink;