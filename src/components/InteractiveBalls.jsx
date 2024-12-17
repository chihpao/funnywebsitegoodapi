import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const InteractiveBalls = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const smallBall1Ref = useRef(null);
  const smallBall2Ref = useRef(null);
  const smallBall3Ref = useRef(null);
  const smallBall4Ref = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollY / maxHeight;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 主球動畫
    gsap.to(ball1Ref.current, {
      x: -100 * scrollProgress, // 左移
      y: 200 * scrollProgress, // 下移
      scale: 1 + scrollProgress, // 縮放
    });
    gsap.to(ball2Ref.current, {
      x: 100 * scrollProgress, // 右移
      y: 200 * scrollProgress, // 下移
      scale: 1 + scrollProgress, // 縮放
    });

    // 小球動畫
    gsap.to([smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current], {
      y: 500 * scrollProgress,
      rotate: 360 * scrollProgress,
      scale: 1 + scrollProgress * 0.5, // 縮放
    });

    // 顏色變化
    if (scrollProgress > 0.5) {
      gsap.to(ball1Ref.current, { borderColor: '#000', duration: 0.5 });
      gsap.to(ball2Ref.current, { borderColor: '#000', duration: 0.5 });
      gsap.to([smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current], { borderColor: '#000', duration: 0.5 });
    } else {
      gsap.to(ball1Ref.current, { borderColor: '#fff', duration: 0.5 });
      gsap.to(ball2Ref.current, { borderColor: '#fff', duration: 0.5 });
      gsap.to([smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current], { borderColor: '#fff', duration: 0.5 });
    }

    // 跑馬燈動畫
    gsap.to(marquee1Ref.current, {
      x: '100%',
      duration: 5, // 調整速度
      repeat: -1,
      ease: 'linear',
    });
    gsap.to(marquee2Ref.current, {
      x: '100%',
      duration: 5, // 調整速度
      repeat: -1,
      ease: 'linear',
    });
  }, [scrollProgress]);

  return (
    <div className="relative h-[200vh]">
      {/* 主球 */}
      <div
        ref={ball1Ref}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-black rounded-full"
      ></div>
      <div
        ref={ball2Ref}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-black rounded-full"
      ></div>

      {/* 小球 */}
      <div
        ref={smallBall1Ref}
        className="absolute top-10 left-1/4 w-10 h-10 border-2 border-black rounded-full"
      ></div>
      <div
        ref={smallBall2Ref}
        className="absolute top-10 left-3/4 w-10 h-10 border-2 border-black rounded-full"
      ></div>
      <div
        ref={smallBall3Ref}
        className="absolute top-20 left-1/3 w-8 h-8 border-2 border-black rounded-full"
      ></div>
      <div
        ref={smallBall4Ref}
        className="absolute top-20 left-2/3 w-8 h-8 border-2 border-black rounded-full"
      ></div>

      {/* 跑馬燈 */}
      <div
        ref={marquee1Ref}
        className="absolute top-1/2 left-0 w-full text-4xl font-bold text-black whitespace-nowrap"
        style={{ transform: 'translateX(-100%)' }}
      >
        做一件事情比起失敗
      </div>
      <div
        ref={marquee2Ref}
        className="absolute top-2/3 left-0 w-full text-4xl font-bold text-black whitespace-nowrap"
        style={{ transform: 'translateX(-100%)' }}
      >
        更可怕的是沒有用心
      </div>
    </div>
  );
};

export default InteractiveBalls;