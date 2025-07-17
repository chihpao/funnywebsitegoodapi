import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';

// 動畫配置常數
const ANIMATION_CONFIG = {
  duration: 20,
  colorTransitionDuration: 0.5,
  scrollThreshold: 0.5
};

// 球體配置
const BALL_CONFIGS = [
  { size: 'w-20 h-20', position: 'top-[-60px] left-1/2 transform -translate-x-1/2' },
  { size: 'w-20 h-20', position: 'top-[-60px] left-1/2 transform -translate-x-1/2' },
  { size: 'w-10 h-10', position: 'top-[-60px] left-1/4' },
  { size: 'w-10 h-10', position: 'top-[-60px] left-3/4' },
  { size: 'w-8 h-8', position: 'top-[-50px] left-1/3' },
  { size: 'w-8 h-8', position: 'top-[-50px] left-2/3' }
];

// 跑馬燈文字配置
const MARQUEE_TEXTS = [
  '這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 •',
  '這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 •'
];

const InteractiveBallsWithMarquee = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // 使用陣列管理 refs
  const ballRefs = useMemo(() => Array.from({ length: 6 }, () => useRef(null)), []);
  const marqueeRefs = useMemo(() => Array.from({ length: 2 }, () => useRef(null)), []);
  const marqueeWrapperRefs = useMemo(() => Array.from({ length: 2 }, () => useRef(null)), []);

  // 使用 useCallback 優化滾動事件處理
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollY / maxHeight;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 抽取動畫邏輯
  useEffect(() => {
    const [ball1, ball2, ...smallBalls] = ballRefs.map(ref => ref.current);
    
    // 主球動畫
    gsap.to(ball1, { x: -100 * scrollProgress, y: 200 * scrollProgress, scale: 1 + scrollProgress });
    gsap.to(ball2, { x: 100 * scrollProgress, y: 200 * scrollProgress, scale: 1 + scrollProgress });
    
    // 小球動畫
    gsap.to(smallBalls, {
      y: 500 * scrollProgress,
      rotate: 360 * scrollProgress,
      scale: 1 + scrollProgress * 0.5
    });

    // 顏色變化動畫
    const borderColor = scrollProgress > ANIMATION_CONFIG.scrollThreshold ? '#000' : '#fff';
    const allBalls = [ball1, ball2, ...smallBalls];
    
    gsap.to(allBalls, { 
      borderColor, 
      duration: ANIMATION_CONFIG.colorTransitionDuration 
    });
  }, [scrollProgress, ballRefs]);

  // 跑馬燈設置
  useEffect(() => {
    const setupMarquee = (wrapperRef, contentRef) => {
      if (!wrapperRef.current || !contentRef.current) return;
      
      const contentWidth = contentRef.current.offsetWidth;
      const clone = contentRef.current.cloneNode(true);
      wrapperRef.current.appendChild(clone);

      gsap.to(wrapperRef.current.children, {
        x: `-=${contentWidth}`,
        duration: ANIMATION_CONFIG.duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    };

    marqueeWrapperRefs.forEach((wrapperRef, index) => {
      setupMarquee(wrapperRef, marqueeRefs[index]);
    });

    return () => {
      marqueeWrapperRefs.forEach(wrapperRef => {
        if (wrapperRef.current?.children) {
          gsap.killTweensOf(wrapperRef.current.children);
        }
      });
    };
  }, [marqueeWrapperRefs, marqueeRefs]);

  return (
    <div className="relative h-[200vh]">
      {/* 跑馬燈區域 */}
      {marqueeWrapperRefs.map((wrapperRef, index) => (
        <div 
          key={index} 
          className={`absolute left-0 w-full overflow-hidden pointer-events-none z-50 h-12 ${
            index === 0 ? 'top-20' : 'top-[25%]'
          }`}
        >
          <div ref={wrapperRef} className="flex whitespace-nowrap">
            <div ref={marqueeRefs[index]} className="flex">
              <p className="text-4xl font-bold text-black pr-8">
                {MARQUEE_TEXTS[index]}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* 球體區域 */}
      {ballRefs.map((ballRef, index) => (
        <div
          key={index}
          ref={ballRef}
          className={`absolute border-2 border-black rounded-full ${BALL_CONFIGS[index].size} ${BALL_CONFIGS[index].position}`}
        />
      ))}
    </div>
  );
};

export default InteractiveBallsWithMarquee;