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

    let newMemeIndex;
    do {
      newMemeIndex = Math.floor(Math.random() * memes.length);
    } while (displayedMemes.includes(newMemeIndex) && displayedMemes.length < memes.length);

    if (displayedMemes.length < memes.length) {
      setDisplayedMemes([...displayedMemes, newMemeIndex]);
      setCurrentMemeIndex(displayedMemes.length);
    }
  };

  const getPreviousMeme = () => {
    if (currentMemeIndex > 0) {
      setCurrentMemeIndex(currentMemeIndex - 1);
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
      <button
        onClick={getAnotherMeme}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
        disabled={loading}
      >
        Get Another Meme
      </button>
      <button
        onClick={getPreviousMeme}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors mb-4 ml-2"
        disabled={currentMemeIndex <= 0}
      >
        Previous Meme
      </button>
      <div className="relative w-full h-64 flex justify-center items-center">
        {loading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        ) : meme ? (
          <img src={meme.src} alt={meme.title} className="w-full h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-700">Click "Get Another Meme" to start</div>
        )}
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
