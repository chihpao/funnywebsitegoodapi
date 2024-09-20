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
          backgroundPosition: 'center top', // 調整背景位置
          backgroundRepeat: 'no-repeat',
          zIndex: -1 // 確保背景圖在 NavBar 之下
        }}
      >
      </div>
    </div>
  );
}

export default HomeContent;