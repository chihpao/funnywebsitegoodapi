import { useState, useEffect } from 'react';
import { fetchJoke, fetchMemes, fetchCatImages, fetchDogImages } from '../API/FunApi';

// 通用的資料載入 Hook
const useDataFetching = (fetchFn, initialState = null) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err);
      console.error(`Error loading data:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, reload: loadData };
};

// Hooks
export const useJoke = () => {
  const { data: joke, loading: jokeLoading, reload: loadJoke } = useDataFetching(fetchJoke);
  return { joke, jokeLoading, loadJoke };
};

export const useMemes = () => {
  const { data: memes, loading: memeLoading, error } = useDataFetching(fetchMemes, []);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);

  const getAnotherMeme = () => {
    if (!memes?.length || displayedMemes.length >= memes.length) {
      alert('已經抓完目前的梗圖');
      return;
    }

    setIsGenerating(true);
    const availableIndices = Array.from({ length: memes.length }, (_, i) => i)
      .filter(i => !displayedMemes.includes(i));
    const newMemeIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setDisplayedMemes([...displayedMemes, newMemeIndex]);
    setCurrentMemeIndex(displayedMemes.length);
    setIsGenerating(false);
  };

  const memeNavigation = {
    previous: () => currentMemeIndex > 0 && setCurrentMemeIndex(currentMemeIndex - 1),
    next: () => currentMemeIndex < displayedMemes.length - 1 && setCurrentMemeIndex(currentMemeIndex + 1),
    jumpTo: (index) => index >= 0 && index < displayedMemes.length && setCurrentMemeIndex(index)
  };

  return {
    memes,
    displayedMemes,
    currentMemeIndex,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    ...memeNavigation
  };
};

export const useCats = () => {
  const { data: catImages, loading, reload: loadCatImages } = useDataFetching(fetchCatImages, []);
  return { catImages, loading, loadCatImages };
};

export const useDogs = () => {
  const { data, loading, reload: loadDogImages } = useDataFetching(fetchDogImages);
  const dogImages = data?.message || [];
  return { dogImages, loading, loadDogImages };
};

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
    previous: getPreviousMeme,
    next: getNextMeme,
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