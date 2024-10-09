import React from 'react';

function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <div className="text-8xl font-bold text-white relative">
          <span className="absolute inset-0 text-black stroke-white">Unlock</span>
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