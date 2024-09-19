import React from 'react';

function HomeContent() {
  return (
    <div className="w-full flex flex-col">
      <div
        className="relative"
        style={{
          height: '100vh',
          backgroundImage: 'url(/tata02.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>
    </div>
  );
}

export default HomeContent;