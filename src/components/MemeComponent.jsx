import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberInput from './NumberInput';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MemeComponent() {
  const [memes, setMemes] = useState([]);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://memes.tw/wtf/api');
      console.log('API response:', response.data); // 添加日誌
      setMemes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching memes:', error);
      setError(error);
      setLoading(false);
    }
  };

  const getAnotherMeme = () => {
    if (memes.length === 0) return;

    if (displayedMemes.length >= memes.length) {
      alert('已經抓完目前的梗圖');
      return;
    }

    let newMemeIndex;
    do {
      newMemeIndex = Math.floor(Math.random() * memes.length);
    } while (displayedMemes.includes(newMemeIndex));

    setDisplayedMemes([...displayedMemes, newMemeIndex]);
    setCurrentMemeIndex(displayedMemes.length);
  };

  const getPreviousMeme = () => {
    if (currentMemeIndex > 0) {
      setCurrentMemeIndex(currentMemeIndex - 1);
    }
  };

  const getNextMeme = () => {
    if (currentMemeIndex < displayedMemes.length - 1) {
      setCurrentMemeIndex(currentMemeIndex + 1);
    }
  };

  const jumpToMeme = (index) => {
    if (index >= 0 && index < displayedMemes.length) {
      setCurrentMemeIndex(index);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  if (error) {
    return <div>Error loading meme: {error.message}</div>;
  }

  const meme = currentMemeIndex >= 0 ? memes[displayedMemes[currentMemeIndex]] : null;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <div className="relative w-full h-64 flex justify-center items-center mb-4">
        {loading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        ) : meme ? (
          <img src={meme.src} alt={meme.title} className="w-full h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-700">點藍色按鈕開始</div>
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={getPreviousMeme}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          disabled={currentMemeIndex <= 0}
        >
          <i className="fas fa-arrow-left"></i> Previous
        </button>
        <button
          onClick={getAnotherMeme}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          <i className="fas fa-random"></i> Random
        </button>
        <button
          onClick={getNextMeme}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          disabled={currentMemeIndex >= displayedMemes.length - 1}
        >
          Next <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <div className="flex items-center justify-center text-gray-700 mb-4">
        <span>目前是第</span>
        <NumberInput
          min={1}
          max={displayedMemes.length}
          value={currentMemeIndex + 1}
          onChange={(value) => jumpToMeme(value - 1)}
        />
        <span>個梗圖，共 {displayedMemes.length} 個梗圖</span>
      </div>
    </div>
  );
}

export default MemeComponent;