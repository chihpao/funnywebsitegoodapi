import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * 自定義游標元件
 * 提供比瀏覽器默認游標更豐富的互動體驗
 * 包含懸停互動元素時的狀態變化和平滑動畫
 */
const CustomCursor = () => {
  // 主游標狀態
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClickable, setIsClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // 跟隨游標狀態 (延遲效果)
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  
  // 引用DOM元素
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  // 檢測裝置類型，確保只在桌面設備顯示自定義游標
  useEffect(() => {
    // 檢查是否為觸控設備
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // 觸控設備不顯示自定義游標
      setIsVisible(false);
      return;
    }
    
    // 滑鼠移動處理
    const moveHandler = (e) => {
      // 更新主游標位置
      setPosition({ x: e.clientX, y: e.clientY });
      
      // 延遲更新跟隨游標位置
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 100);
      
      // 判斷當前元素是否可點擊
      const clickable = e.target.closest('a, button, input, textarea, select, [role="button"], .clickable');
      setIsClickable(!!clickable);
    };

    // 滑鼠進入/離開頁面
    const mouseEnterHandler = () => setIsVisible(true);
    const mouseLeaveHandler = () => setIsVisible(false);
    
    // 滑鼠按下/放開
    const mouseDownHandler = () => setIsClicked(true);
    const mouseUpHandler = () => setIsClicked(false);

    // 綁定所有事件監聽
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseenter', mouseEnterHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);
    document.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    // 組件卸載時清理
    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseenter', mouseEnterHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
      document.removeEventListener('mousedown', mouseDownHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  // 只在非觸控設備上渲染
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* 主游標 */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicked ? 0.8 : isClickable ? 1.2 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          damping: 30,
          mass: 0.5,
          stiffness: 400
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          width: isClickable ? 40 : 16,
          height: isClickable ? 40 : 16,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          backgroundColor: isClickable ? 'rgba(255, 255, 255, 0.8)' : 'white',
          border: isClickable ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
        }}
      />
      
      {/* 跟隨游標 (延遲效果) */}
      <motion.div
        ref={trailRef}
        className="cursor-trail"
        animate={{
          x: trailPosition.x,
          y: trailPosition.y,
          opacity: isVisible ? 0.3 : 0
        }}
        transition={{
          type: 'spring',
          damping: 25,
          mass: 0.3,
          stiffness: 200
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          width: 6,
          height: 6,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          backgroundColor: 'white',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

export default CustomCursor;