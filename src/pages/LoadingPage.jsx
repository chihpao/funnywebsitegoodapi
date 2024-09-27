import React, { useEffect } from 'react';

function LoadingPage({ setIsLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('loading-page').classList.add('translate-y-full');
      setTimeout(() => setIsLoading(false), 1000); // 1秒後隱藏加載頁面
    }, 3000); // 3秒後開始上移效果

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div id="loading-page" className="fixed inset-0 flex items-center justify-center bg-black z-50 transition-transform duration-1000 ease-in-out">
      <div className="text-center">
        <div className="text-8xl font-bold text-white relative">
          <span className="absolute inset-0 text-black">Unlock</span>
          <span className="relative">Unlock</span>
        </div>
        <div className="text-6xl font-bold text-white mt-4">your world</div>
        <div className="text-6xl font-bold text-white mt-4">
          {'On Loading'.split('').map((char, index) => (
            <span key={index} className="inline-block animate-flip" style={{ animationDelay: `${index * 0.2}s` }}>{char}</span>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes flip {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .animate-flip {
            animation: flip 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default LoadingPage;