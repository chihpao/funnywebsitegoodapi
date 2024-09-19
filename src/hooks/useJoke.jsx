import { useState, useEffect } from 'react';
import { fetchJoke } from '../API/FunApi';

const useJoke = () => {
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

export default useJoke;