import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <div className="flex mb-4">
        <button
          onClick={getAnotherMeme}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          Get Another Meme
        </button>
        <button
          onClick={getPreviousMeme}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors ml-2"
          disabled={currentMemeIndex <= 0}
        >
          Previous Meme
        </button>
        <button
          onClick={getNextMeme}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors ml-2"
          disabled={currentMemeIndex >= displayedMemes.length - 1}
        >
          Next Meme
        </button>
      </div>
      <div className="relative w-full h-64 flex justify-center items-center">
        {loading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        ) : meme ? (
          <img src={meme.src} alt={meme.title} className="w-full h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-700">Click "Get Another Meme" to start</div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-gray-700">
          目前是第 
          <input
            type="number"
            min="1"
            max={displayedMemes.length}
            value={currentMemeIndex + 1}
            onChange={(e) => jumpToMeme(Number(e.target.value) - 1)}
            className="mx-2 p-2 border rounded-md w-16 text-center"
          /> 
          個梗圖，共 {displayedMemes.length} 個梗圖
        </div>
      </div>
    </div>
  );
}

export default MemeComponent;

{/* 
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <img src={src} alt={title} className="w-full rounded-md" />
      <p className="text-gray-700 mt-2">By: {authorName}</p>
      <p className="text-gray-700">Views: {pageview}</p>
      <p className="text-gray-700">Likes: {total_like_count}</p>
      <p className="text-gray-700">Created at: {createdAt}</p>
      <p className="text-gray-700">Hashtag: {hashtag}</p>
      <p className="text-gray-700">Category: {contestName}</p>
*/}