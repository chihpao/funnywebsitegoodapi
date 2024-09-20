import React from 'react';
import '../styles/index.css'; // 引入 CSS 檔案

function HomeContent() {
  return (
    <div className="w-full flex flex-col">
      <div>
        className="relative"
        style={{
          height: '100vh',
          backgroundImage: 'url(/tata04.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      </div>
    </div>
  );
}

export default HomeContent;