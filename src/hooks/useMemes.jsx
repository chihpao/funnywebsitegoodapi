import { useState, useEffect } from 'react';
import { fetchMemes } from '../API/FunApi';

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(-1);
  const [memeLoading, setMemeLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadMemes = async () => {
    setMemeLoading(true);
    setError(null);
    try {
      const memesData = await fetchMemes();
      setMemes(memesData);
    } catch (error) {
      setError(error);
    } finally {
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
    loadMemes();
  }, []);

  return {
    memes,
    displayedMemes,
    currentMemeIndex,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    getPreviousMeme,
    getNextMeme,
    jumpToMeme,
  };
};

export default useMemes;