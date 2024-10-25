import React, { useEffect, useState } from "react";

const ScrollEffectComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // 偵測滾動事件
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 計算樣式
  const opacity = Math.min(1, scrollPosition / 500); // 控制透明度
  const scale = 1 + scrollPosition / 1000; // 控制大小
  const rotate = scrollPosition / 10; // 控制旋轉
  const translateY = scrollPosition / 5; // 控制垂直位移
  const backgroundColor = `rgb(${Math.min(255, scrollPosition)}, 100, 150)`; // 控制背景顏色
  const textColor = `rgb(${255 - Math.min(255, scrollPosition)}, 255, 255)`; // 控制文字顏色
  const boxShadow = `0px ${scrollPosition / 10}px ${scrollPosition / 5}px rgba(0, 0, 0, 0.5)`; // 控制陰影效果

  return (
    <div className="h-[200vh]"> {/* 讓頁面高度足夠可以滾動 */}
      <div
        className="fixed left-0 right-0 h-64 transition-all duration-500"
        style={{
          top: '110px', // 設置 top 為 navbar 的高度
          opacity: `${opacity}`,
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: `${boxShadow}`,
          zIndex: 0, // 確保這個組件的 z-index 低於 navbar
        }}
      >
        <h1 className="text-center text-4xl" style={{ color: `${textColor}` }}>Scroll Down!</h1>
      </div>
      <div
        className="fixed left-0 right-0 h-64 transition-all duration-500"
        style={{
          top: '400px', // 設置 top 為 navbar 的高度
          opacity: `${opacity}`,
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: `${boxShadow}`,
          zIndex: 0, // 確保這個組件的 z-index 低於 navbar
        }}
      >
        <h1 className="text-center text-4xl" style={{ color: `${textColor}` }}>Keep Scrolling!</h1>
      </div>
    </div>
  );
};

export default ScrollEffectComponent;