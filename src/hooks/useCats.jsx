import { useState, useEffect } from 'react';
import { fetchCatImages } from '../API/FunApi';

const useCats = () => {
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

export default useCats;