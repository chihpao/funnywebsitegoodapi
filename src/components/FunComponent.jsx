import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

function FunComponent() {
  const [joke, setJoke] = useState(null);
  const [jokeLoading, setJokeLoading] = useState(true);
  const [memes, setMemes] = useState([]);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(-1);
  const [memeLoading, setMemeLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchJoke = () => {
    setJokeLoading(true);
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        setJoke(response.data);
        setJokeLoading(false);
      })
      .catch(error => {
        console.error('Error fetching joke:', error);
        setJokeLoading(false);
      });
  };

  const fetchMemes = async () => {
    setMemeLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://memes.tw/wtf/api');
      console.log('API response:', response.data); // 添加日誌
      setMemes(response.data);
      setMemeLoading(false);
    } catch (error) {
      console.error('Error fetching memes:', error);
      setError(error);
      setMemeLoading(false);
    }
  };

  const getAnotherMeme = async () => {
    if (memes.length === 0) return;

    if (displayedMemes.length >= memes.length) {
      alert('已經抓完目前的梗圖');
      return;
    }

    setIsGenerating(true);

    let newMemeIndex;
    do {
      newMemeIndex = Math.floor(Math.random() * memes.length);
    } while (displayedMemes.includes(newMemeIndex));

    setDisplayedMemes([...displayedMemes, newMemeIndex]);
    setCurrentMemeIndex(displayedMemes.length);
    setIsGenerating(false);
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
    fetchJoke();
    fetchMemes();
  }, []);

  if (error) {
    return <div>Error loading meme: {error.message}</div>;
  }

  const meme = currentMemeIndex >= 0 ? memes[displayedMemes[currentMemeIndex]] : null;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8">
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">隨機笑話</h2>
          {jokeLoading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          ) : (
            <div className="text-center">
              <p className="text-lg">{joke.setup}</p>
              <p className="text-lg font-bold mt-2">{joke.punchline}</p>
            </div>
          )}
          <button
            onClick={fetchJoke}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            再來一個笑話
          </button>
        </div>
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">隨機梗圖</h2>
          <div className="relative w-full h-64 flex justify-center items-center mb-4">
            {memeLoading ? (
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            ) : meme ? (
              <img src={meme.src} alt={meme.title} className="w-full h-full object-contain rounded-md" />
            ) : (
              <div className="text-center text-gray-700">點藍色按鈕開始</div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4 space-x-2">
            <button
              onClick={getPreviousMeme}
              className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              disabled={currentMemeIndex <= 0}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button
              onClick={getAnotherMeme}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              disabled={memeLoading || isGenerating}
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
              ) : (
                <i className="fas fa-random"></i>
              )}
            </button>
            <button
              onClick={getNextMeme}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              disabled={currentMemeIndex >= displayedMemes.length - 1}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunComponent;