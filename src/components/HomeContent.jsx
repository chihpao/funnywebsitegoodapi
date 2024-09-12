import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="relative flex-grow">
        <img
          src="/tata02.jpg"
          alt="Funny"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default HomeContent;