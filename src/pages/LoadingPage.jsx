import React from 'react';

function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <div className="text-center mb-5">
        <div className="text-4xl mb-2">Unlock your world</div>
        <div className="text-4xl">
          {'On Loading'.split('').map((char, index) => (
            <span key={index} className={`inline-block animate-flip`} style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s', animationIterationCount: 'infinite' }}>{char}</span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes flip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-flip {
          animation: flip 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default LoadingPage;