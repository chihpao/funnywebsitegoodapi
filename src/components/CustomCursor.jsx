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

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseenter', mouseEnterHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
    };
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
    border: isClickable ? '2px solid black' : 'none',
    opacity: isVisible ? 1 : 0
  };

  return <div style={style} />;
};

export default CustomCursor;