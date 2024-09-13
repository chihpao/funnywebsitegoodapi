import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="flex-grow relative">
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