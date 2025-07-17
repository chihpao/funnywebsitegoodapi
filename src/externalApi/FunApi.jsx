import { useState, useEffect } from 'react';

// API 配置常數
const API_CONFIG = {
  timeout: 10000, // 10秒超時
  headers: {
    'Content-Type': 'application/json',
  }
};

// API 端點
const API_ENDPOINTS = {
  joke: 'https://official-joke-api.appspot.com/random_joke',
  memes: 'https://memes.tw/wtf/api',
  cats: 'https://api.thecatapi.com/v1/images/search?limit=10',
  dogs: 'https://dog.ceo/api/breeds/image/random/10'
};

// 統一的 fetch 函數，包含超時和錯誤處理
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
  
  try {
    const response = await fetch(url, {
      ...API_CONFIG,
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`API response from ${url}:`, data);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('請求超時，請稍後再試');
    }
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

//
// API 請求函式
//
export const fetchJoke = () => fetchWithTimeout(API_ENDPOINTS.joke);

export const fetchMemes = () => fetchWithTimeout(API_ENDPOINTS.memes);

export const fetchCatImages = () => fetchWithTimeout(API_ENDPOINTS.cats);

export const fetchDogImages = () => fetchWithTimeout(API_ENDPOINTS.dogs);

//
// 通用資料載入 Hook
//
const useDataFetching = (fetchFn, initialState = null) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false); // 初始不載入
  const [error, setError] = useState(null);

  const loadData = async () => {
    if (loading) return; // 防止重複請求
    
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const errorMessage = err.message || '載入資料時發生錯誤';
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 移除自動載入，改為手動觸發
  // useEffect(() => {
  //   loadData();
  // }, []);

  return { data, loading, error, reload: loadData };
};

//
// Hooks
//
export const useJoke = () => {
  const { data: joke, loading: jokeLoading, reload: loadJoke } = useDataFetching(fetchJoke);
  return { joke, jokeLoading, loadJoke };
};

export const useMemes = () => {
  const { data: memes, loading: memeLoading, error, reload: loadMemes } = useDataFetching(fetchMemes, []);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);

  // 初次載入 memes
  useEffect(() => {
    if (!memes?.length && !memeLoading && !error) {
      loadMemes();
    }
  }, []);

  const getAnotherMeme = async () => {
    // 如果還沒載入 memes，先載入
    if (!memes?.length && !memeLoading) {
      await loadMemes();
      return;
    }
    
    if (!memes?.length || displayedMemes.length >= memes.length) {
      console.warn('已經抓完目前的梗圖');
      return;
    }
    
    setIsGenerating(true);
    try {
      const availableIndices = Array.from({ length: memes.length }, (_, i) => i)
        .filter(i => !displayedMemes.includes(i));
      const newMemeIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

      setDisplayedMemes(prev => [...prev, newMemeIndex]);
      setCurrentMemeIndex(displayedMemes.length);
    } finally {
      setIsGenerating(false);
    }
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
  const { data, loading, reload: loadDogImages } = useDataFetching(fetchDogImages, []);
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