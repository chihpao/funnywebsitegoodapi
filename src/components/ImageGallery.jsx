import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * 圖片相簿組件
 * 提供彈出式圖片查看器，支援左右滑動切換圖片功能
 * 
 * @param {Object} props - 組件屬性
 * @param {Array} props.images - 圖片數組，每個項目應包含 {img, event} 屬性
 * @param {number} props.initialIndex - 初始顯示的圖片索引
 * @param {boolean} props.isOpen - 控制相簿是否開啟
 * @param {function} props.onClose - 關閉相簿的回調函數
 */
const ImageGallery = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 當 isOpen 或 initialIndex 變更時更新當前索引
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // 禁止背景滾動 - 使用class而不是直接修改style
      document.body.classList.add('gallery-open');
    } else {
      // 恢復背景滾動
      document.body.classList.remove('gallery-open');
    }
    
    // 組件卸載時恢復背景滾動
    return () => {
      document.body.classList.remove('gallery-open');
    };
  }, [isOpen, initialIndex]);

  // 最小滑動距離
  const minSwipeDistance = 50;

  // 觸控事件處理
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  // 切換到上一張圖片
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 切換到下一張圖片
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 鍵盤事件處理
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // 添加和移除鍵盤事件監聽器
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // 如果相簿未開啟，則不渲染任何內容
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* 關閉按鈕 */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            onClick={onClose}
            aria-label="關閉相簿"
          >
            <FiX size={24} />
          </button>
          
          {/* 圖片容器 */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* 上一張按鈕 */}
            <button
              className="absolute left-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              aria-label="上一張圖片"
            >
              <FiChevronLeft size={24} />
            </button>
            
            {/* 圖片顯示 */}
            <motion.div
              key={currentIndex}
              className="w-full h-full flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="relative max-w-4xl max-h-[80vh] overflow-hidden">
                <img
                  src={images[currentIndex].img}
                  alt={images[currentIndex].event || `圖片 ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              
              {/* 圖片說明 */}
              <div className="text-white text-center mt-4 max-w-2xl">
                <h3 className="text-xl font-bold mb-1">{images[currentIndex].year}</h3>
                <p className="text-lg">{images[currentIndex].event}</p>
              </div>
              
              {/* 圖片計數器 */}
              <div className="text-white text-sm mt-4">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
            
            {/* 下一張按鈕 */}
            <button
              className="absolute right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="下一張圖片"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageGallery;
