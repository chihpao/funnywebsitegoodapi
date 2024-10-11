import React from 'react';

function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="text-center mb-8">
        <div className="text-8xl font-bold text-black relative" style={{ marginBottom: '50px' }}>
          <span className="absolute inset-0 text-white stroke-white animate-pulse">Unlock</span>
          <span className="relative">Unlock</span>
        </div>
        <div className="text-6xl font-bold text-white mt-4">your world</div>
      </div>
      <div className="text-4xl font-bold text-white mt-4">
        {'On Loading'.split('').map((char, index) => (
          <span key={index} className="inline-block" style={{ animation: `flip 0.2s linear ${index * 0.2}s 1` }}>{char}</span>
        ))}
      </div>
      <style>
        {`
          @keyframes flip {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .stroke-white {
            -webkit-text-stroke: 8px white;
          }
        `}
      </style>
    </div>
  );
}

export default LoadingPage;