import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClickable, setIsClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const clickable = e.target.closest('a, button, input, textarea, select, [role="button"]');
      setIsClickable(!!clickable);
    };

    const mouseEnterHandler = () => setIsVisible(true);
    const mouseLeaveHandler = () => setIsVisible(false);

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseenter', mouseEnterHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);

    // 移除網站上的自定義鼠標樣式，恢復為瀏覽器預設鼠標
    document.body.style.cursor = 'auto';
    
    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseenter', mouseEnterHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

  // 只顯示鼠標指向位置的淺藍色圓形區塊
  const style = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    transform: 'translate(-50%, -50%)',
    width: 40, // 增大圓形區塊大小
    height: 40, // 增大圓形區塊大小
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998, // 確保在鼠標下方
    backgroundColor: 'rgba(173, 216, 230, 0.6)', // 淺藍色底色，半透明
    opacity: isVisible ? 1 : 0
  };

  return <div style={style} />;
};

export default CustomCursor;