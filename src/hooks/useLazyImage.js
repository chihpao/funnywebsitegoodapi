import { useState, useEffect, useRef } from 'react';

/**
 * 圖片懶載入 Hook
 * @param {string} src - 圖片來源
 * @param {string} placeholder - 佔位符圖片
 * @returns {object} - 包含 imgSrc, isLoaded, isError 的物件
 */
export function useLazyImage(src, placeholder = '') {
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          
          img.onload = () => {
            setImgSrc(src);
            setIsLoaded(true);
            setIsError(false);
          };
          
          img.onerror = () => {
            setIsError(true);
            setIsLoaded(false);
          };
          
          img.src = src;
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { imgSrc, isLoaded, isError, imgRef };
}

/**
 * 預載入圖片 Hook
 * @param {string[]} imageSources - 圖片來源陣列
 * @returns {object} - 包含 preloadedImages, isAllLoaded 的物件
 */
export function useImagePreloader(imageSources) {
  const [preloadedImages, setPreloadedImages] = useState({});
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    let loadedCount = 0;
    const totalImages = imageSources.length;
    const imagePromises = [];

    imageSources.forEach((src, index) => {
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          setPreloadedImages(prev => ({
            ...prev,
            [src]: { loaded: true, error: false }
          }));
          
          if (loadedCount === totalImages) {
            setIsAllLoaded(true);
          }
          
          resolve(img);
        };
        
        img.onerror = () => {
          loadedCount++;
          setPreloadedImages(prev => ({
            ...prev,
            [src]: { loaded: false, error: true }
          }));
          
          if (loadedCount === totalImages) {
            setIsAllLoaded(true);
          }
          
          reject(new Error(`Failed to load image: ${src}`));
        };
        
        img.src = src;
      });
      
      imagePromises.push(promise);
    });

    return () => {
      // 清理函數
      imagePromises.forEach(promise => {
        promise.catch(() => {}); // 忽略錯誤
      });
    };
  }, [imageSources]);

  return { preloadedImages, isAllLoaded };
}
