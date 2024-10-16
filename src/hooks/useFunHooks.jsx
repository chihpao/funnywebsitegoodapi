import { useState, useEffect } from 'react';
import { fetchJoke, fetchMemes, fetchCatImages } from '../API/FunApi';

// useJoke Hook
export const useJoke = () => {
  const [joke, setJoke] = useState(null);
  const [jokeLoading, setJokeLoading] = useState(true);

  const loadJoke = async () => {
    setJokeLoading(true);
    try {
      const jokeData = await fetchJoke();
      setJoke(jokeData);
    } catch (error) {
      console.error('Error loading joke:', error);
    } finally {
      setJokeLoading(false);
    }
  };

  useEffect(() => {
    loadJoke();
  }, []);

  return { joke, jokeLoading, loadJoke };
};

// useMemes Hook
export const useMemes = () => {
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

// useCats Hook
export const useCats = () => {
  const [catImages, setCatImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCatImages = async () => {
    setLoading(true);
    try {
      const images = await fetchCatImages();
      setCatImages(images);
    } catch (error) {
      console.error('Error loading cat images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatImages();
  }, []);

  return { catImages, loading, loadCatImages };
};

// useDogs Hook
export const useDogs = () => {
  const [dogImages, setDogImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDogImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
      const data = await response.json();
      setDogImages(data.message);
    } catch (error) {
      console.error('Error loading dog images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDogImages();
  }, []);

  return { dogImages, loading, loadDogImages };
};

// useFunLogic Hook
export const useFunLogic = () => {
  const { joke, jokeLoading, loadJoke } = useJoke();
  const {
    memes,
    displayedMemes,
    currentMemeIndex,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    getPreviousMeme,
    getNextMeme,
  } = useMemes();
  const { catImages, loading: catLoading, loadCatImages } = useCats();
  const { dogImages, loading: dogLoading, loadDogImages } = useDogs();

  const meme = currentMemeIndex >= 0 ? memes[displayedMemes[currentMemeIndex]] : null;

  return {
    joke,
    jokeLoading,
    loadJoke,
    meme,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    getPreviousMeme,
    getNextMeme,
    currentMemeIndex,
    displayedMemes,
    catImages,
    catLoading,
    loadCatImages,
    dogImages,
    dogLoading,
    loadDogImages,
  };
};