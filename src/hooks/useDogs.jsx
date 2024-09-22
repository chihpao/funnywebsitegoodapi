import { useState, useEffect } from 'react';

const useDogs = () => {
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

export default useDogs;