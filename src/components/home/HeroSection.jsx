import React, { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { ANIMATIONS, TOUCH_CONFIG } from "../../utils/animations";

// 觸控配置常數
const images = [
  { src: "/tata01.jpg", position: "center", mobilePosition: "center" },
  { src: "/tata02.jpg", position: "top", mobilePosition: "5% 50%" },
  { src: "/tata03.jpg", position: "50% 30%", mobilePosition: "70% center" },   
  { src: "/tata04.jpg", position: "100% 80%", mobilePosition: "1% center" }, 
  { src: "/tata05.jpg", position: "100% 40%", mobilePosition: "7% center" },
  { src: "/tata06.jpg", position: "center", mobilePosition: "80% center" },
  { src: "/tata07.jpg", position: "50% 30%", mobilePosition: "55% center" },
  { src: "/tata08.jpg", position: "60% 100%", mobilePosition: "center" }, 
  { src: "/tata09.jpg", position: "80% 60%", mobilePosition: "15% center" },
  { src: "/tata10.jpg", position: "80% 60%", mobilePosition: "75% center" }
];

function HeroSection() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 使用 useCallback 優化事件處理函數
  const handlePrevious = useCallback(() => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  // 觸控事件處理
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > TOUCH_CONFIG.minSwipeDistance;
    const isRightSwipe = distance < -TOUCH_CONFIG.minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();
  }, [touchStart, touchEnd, handleNext, handlePrevious]);

  // 使用 useMemo 優化背景樣式計算
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${images[index].src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: window.innerWidth <= 768 
      ? images[index].mobilePosition 
      : images[index].position,
  }), [index]);

  return (
    <section className="relative h-screen w-full max-w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={backgroundStyle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 輕微的遮罩層，保持導航按鈕可見性 */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        {/* 導航按鈕 */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="上一張圖片"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label="下一張圖片"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 圖片指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`切換到第 ${i + 1} 張圖片`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection);
