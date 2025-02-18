import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // 檢查目前 target 是否為可點擊元素 (例如 a, button, input ...)
      const clickable = e.target.closest('a, button, input, textarea, select, [role="button"]');
      setIsClickable(!!clickable);
    };

    document.addEventListener('mousemove', moveHandler);
    return () => document.removeEventListener('mousemove', moveHandler);
  }, []);

  const style = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'background-color 0.2s, border 0.2s',
    backgroundColor: isClickable ? 'white' : 'black',
    border: isClickable ? '2px solid black' : 'none'
  };

  return <div style={style} />;
};

export default CustomCursor;