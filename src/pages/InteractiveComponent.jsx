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
  const backgroundColor = `rgb(${Math.min(255, scrollPosition)}, 0, 255)`; // 控制背景顏色
  const textColor = `rgb(${255 - Math.min(255, scrollPosition)}, 255, 0)`; // 控制文字顏色
  const boxShadow = `0px ${scrollPosition / 10}px ${scrollPosition / 5}px rgba(0, 255, 255, 0.5)`; // 控制陰影效果

  return (
    <div className="h-[1000vh] bg-gradient-to-b from-black via-purple-900 to-black"> {/* 讓頁面高度足夠可以滾動，並增加漸變背景 */}
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
        <h1 className="text-center text-4xl font-bold" style={{ color: `${textColor}`, fontFamily: 'monospace' }}>Design Thinking</h1>
      </div>
      <div
        className="fixed left-0 right-0 h-64 transition-all duration-500"
        style={{
          top: '700px', // 設置 top 為 navbar 的高度
          opacity: `${opacity}`,
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: `${boxShadow}`,
          zIndex: 0, // 確保這個組件的 z-index 低於 navbar
        }}
      >
        <h1 className="text-center text-4xl font-bold" style={{ color: `${textColor}`, fontFamily: 'monospace' }}>Almost There!</h1>
      </div>
      <div
        className="fixed left-0 right-0 h-64 transition-all duration-500"
        style={{
          top: '1000px', // 設置 top 為 navbar 的高度
          opacity: `${opacity}`,
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: `${boxShadow}`,
          zIndex: 0, // 確保這個組件的 z-index 低於 navbar
        }}
      >
        <h1 className="text-center text-4xl font-bold" style={{ color: `${textColor}`, fontFamily: 'monospace' }}>You Made It!</h1>
      </div>
      <div
        className="fixed left-0 right-0 h-64 transition-all duration-500"
        style={{
          top: '1300px', // 設置 top 為 navbar 的高度
          opacity: `${opacity}`,
          transform: `scale(${scale}) rotate(${rotate}deg) translateY(${translateY}px)`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: `${boxShadow}`,
          zIndex: 0, // 確保這個組件的 z-index 低於 navbar
        }}
      >
        <h1 className="text-center text-4xl font-bold" style={{ color: `${textColor}`, fontFamily: 'monospace' }}>Congratulations!</h1>
      </div>
    </div>
  );
};

export default ScrollEffectComponent;