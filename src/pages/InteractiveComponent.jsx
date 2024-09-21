import React, { useState, useEffect, useRef } from 'react';
import { FaRedo, FaPlay, FaPause } from 'react-icons/fa';

function getRandomPosition(maxWidth, maxHeight) {
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
}

function getRandomColor() {
  const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomSize() {
  return Math.floor(Math.random() * 30) + 20; // 隨機大小在20到50之間
}

function getRandomScore() {
  return Math.floor(Math.random() * 10) + 1; // 隨機分數在1到10之間
}

function InteractiveComponent() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 倒計時30秒
  const [isPlaying, setIsPlaying] = useState(false);
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);
  const moveTargetsRef = useRef(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = gameAreaRef.current;
    const initialTargets = Array.from({ length: 5 }).map(() => ({
      position: getRandomPosition(clientWidth - 50, clientHeight - 50),
      color: getRandomColor(),
      size: getRandomSize(),
      score: getRandomScore(),
    }));
    setTargets(initialTargets);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            clearInterval(moveTargetsRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      moveTargetsRef.current = setInterval(() => {
        const { clientWidth, clientHeight } = gameAreaRef.current;
        setTargets((prevTargets) =>
          prevTargets.map((target) => ({
            ...target,
            position: getRandomPosition(clientWidth - target.size, clientHeight - target.size),
          }))
        );
      }, 2000); // 將移動速度變慢
    } else {
      clearInterval(timerRef.current);
      clearInterval(moveTargetsRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(moveTargetsRef.current);
    };
  }, [isPlaying]);

  const handleTargetClick = (index) => {
    setScore((prevScore) => prevScore + targets[index].score);
    const { clientWidth, clientHeight } = gameAreaRef.current;
    setTargets((prevTargets) =>
      prevTargets.map((target, i) =>
        i === index
          ? {
              position: getRandomPosition(clientWidth - target.size, clientHeight - target.size),
              color: getRandomColor(),
              size: getRandomSize(),
              score: getRandomScore(),
            }
          : target
      )
    );
  };

  const handleRestart = () => {
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(false);
    const { clientWidth, clientHeight } = gameAreaRef.current;
    const initialTargets = Array.from({ length: 5 }).map(() => ({
      position: getRandomPosition(clientWidth - 50, clientHeight - 50),
      color: getRandomColor(),
      size: getRandomSize(),
      score: getRandomScore(),
    }));
    setTargets(initialTargets);
  };

  const handleStartPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-black">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 py-2 bg-gray-200 shadow-md space-y-2 md:space-y-0 md:space-x-4">
        <h1 className="text-xl font-bold">點下去就對了</h1>
        <p className="text-lg">得分: {score}</p>
        <p className="text-lg">最高分數: {highScore}</p>
        <p className="text-lg">剩餘時間: {timeLeft} 秒</p>
      </div>
      <div className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 shadow-md space-x-4 mt-2">
        <button
          onClick={handleStartPause}
          className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-all"
        >
          {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
          {isPlaying ? '暫停遊戲' : '開始遊戲'}
        </button>
        <button
          onClick={handleRestart}
          className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all"
        >
          <FaRedo className="mr-2" />
          重新開始
        </button>
      </div>
      <div
        ref={gameAreaRef}
        className="relative w-full h-full flex-grow bg-gray-100 rounded-lg shadow-lg overflow-hidden mt-4"
      >
        {timeLeft > 0 ? (
          targets.map((target, index) => (
            <div
              key={index}
              onClick={() => handleTargetClick(index)}
              style={{
                top: target.position.y,
                left: target.position.x,
                width: `${target.size}px`,
                height: `${target.size}px`,
                backgroundColor: target.color,
                position: 'absolute',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
              className="transform hover:scale-110"
            ></div>
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold mb-4">遊戲結束！</p>
            <button
              onClick={handleRestart}
              className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all"
            >
              <FaRedo className="mr-2" />
              重新開始
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveComponent;