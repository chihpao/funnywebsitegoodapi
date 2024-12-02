import React, { useEffect, useState } from "react";
import throttle from "lodash/throttle";

const ScrollEffectItem = ({ top, text, dynamicStyles, onClick }) => (
  <div
    className="fixed left-0 right-0 h-64 transition-all duration-500 cursor-pointer"
    style={{
      top: `${top}px`,
      opacity: dynamicStyles.opacity,
      transform: dynamicStyles.transform,
      backgroundColor: dynamicStyles.backgroundColor,
      boxShadow: dynamicStyles.boxShadow,
    }}
    onClick={onClick}
  >
    <h1
      className="text-center text-4xl font-bold"
      style={{
        color: dynamicStyles.color,
        fontFamily: "monospace",
      }}
    >
      {text}
    </h1>
  </div>
);

const ScrollEffectComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [catPosition, setCatPosition] = useState({ top: '80%', left: '10%' });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setClicked(false);
      }, 2000); // 2秒後自動消失
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  const handleClick = () => {
    setClicked(true);
    // 隨機改變貓咪的位置和大小
    setCatPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    });
  };

  const dynamicStyles = {
    opacity: Math.min(1, scrollPosition / 500),
    transform: `scale(${1 + scrollPosition / 1000}) rotate(${scrollPosition / 10}deg) translateY(${scrollPosition / 5}px)`,
    backgroundColor: `rgb(${Math.min(255, scrollPosition)}, 0, 255)`,
    boxShadow: `0px ${scrollPosition / 10}px ${scrollPosition / 5}px rgba(0, 255, 255, 0.5)`,
    color: `rgb(${255 - Math.min(255, scrollPosition)}, 255, 0)`,
  };

  const catStyles = {
    position: 'fixed',
    top: catPosition.top,
    left: catPosition.left,
    width: '150px',
    height: '150px',
    transition: 'transform 0.5s, top 0.5s, left 0.5s',
    transform: `translateY(${scrollPosition / 2}px)`,
  };

  return (
    <div className="h-[1000vh] bg-gradient-to-b from-black via-purple-900 to-black">
      {["Design Thinking", "Almost There!", "You Made It!", "Congratulations!"].map(
        (text, index) => (
          <ScrollEffectItem
            key={index}
            top={110 + index * 300}
            text={text}
            dynamicStyles={dynamicStyles}
            onClick={handleClick}
          />
        )
      )}
      <img
        src="src\assets\cat-dance01.gif" // 確保路徑正確
        alt="Cat"
        style={catStyles}
        onClick={handleClick}
      />
      {clicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-6xl">You clicked me!</h1>
        </div>
      )}
    </div>
  );
};

export default ScrollEffectComponent;