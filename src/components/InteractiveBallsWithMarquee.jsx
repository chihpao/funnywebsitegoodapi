import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

const InteractiveBallsWithMarquee = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [preferReducedMotion, setPreferReducedMotion] = useState(false);
    const { ref: animationRef, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });
    
    const ball1Ref = useRef(null);
    const ball2Ref = useRef(null);
    const smallBall1Ref = useRef(null);
    const smallBall2Ref = useRef(null);
    const smallBall3Ref = useRef(null);
    const smallBall4Ref = useRef(null);
    const marqueeRef1 = useRef(null);
    const marqueeRef2 = useRef(null);
    const marqueeWrapperRef1 = useRef(null);
    const marqueeWrapperRef2 = useRef(null);

    const handleScroll = () => {
        if (preferReducedMotion) return; // 如果使用者偏好減少動態效果，則不計算滾動進度
        
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollY / maxHeight;
        setScrollProgress(progress);
    };

    useEffect(() => {
        // 檢測使用者是否偏好減少動態效果
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPreferReducedMotion(mediaQuery.matches);
        
        // 監聽使用者偏好設定變化
        const handleMediaChange = (e) => setPreferReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleMediaChange);
        
        // 監聽滾動事件
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (preferReducedMotion || !inView) return; // 如果使用者偏好減少動態效果或元素不在視窗中，則不進行動畫
        
        // 使用請求動畫幀以增加效能
        const animateElements = () => {
            // 移動大球
            gsap.to(ball1Ref.current, { 
                x: -100 * scrollProgress, 
                y: 200 * scrollProgress, 
                scale: 1 + scrollProgress * 0.3,
                duration: 0.3 // 平滑過渡
            });
            
            gsap.to(ball2Ref.current, { 
                x: 100 * scrollProgress, 
                y: 200 * scrollProgress, 
                scale: 1 + scrollProgress * 0.3,
                duration: 0.3
            });
            
            // 移動小球群組
            gsap.to([smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current], {
                y: Math.min(500 * scrollProgress, 300), // 限制最大位移
                rotate: 360 * scrollProgress,
                scale: 1 + scrollProgress * 0.4,
                duration: 0.3,
                stagger: 0.05 // 添加錯開效果
            });

            // 動態調整邊框顏色
            const borderColor = scrollProgress > 0.5 ? '#000' : '#fff';
            gsap.to([ball1Ref.current, ball2Ref.current], { 
                borderColor, 
                duration: 0.5 
            });
            
            gsap.to(
                [smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current],
                { borderColor, duration: 0.5 }
            );
        };
        
        // 執行動畫
        animateElements();
    }, [scrollProgress, preferReducedMotion, inView]);

    useEffect(() => {
        if (preferReducedMotion) return; // 如果使用者偏好減少動態效果，則不設置跑馬燈
        
        const setupMarquee = (wrapperRef, contentRef, direction = -1, speed = 20) => {
            if (!wrapperRef.current || !contentRef.current) return;
            
            // 清除現有子元素
            while (wrapperRef.current.childNodes.length > 1) {
                wrapperRef.current.removeChild(wrapperRef.current.lastChild);
            }
            
            // 複製內容並添加到 wrapper
            const contentWidth = contentRef.current.offsetWidth;
            const clone = contentRef.current.cloneNode(true);
            wrapperRef.current.appendChild(clone);

            // 基於螢幕寬度調整速度
            const adjustedSpeed = window.innerWidth < 768 ? speed * 0.7 : speed;
            
            // 建立跑馬燈動畫
            gsap.to(wrapperRef.current.children, {
                x: `${direction * contentWidth}px`,
                duration: adjustedSpeed,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
                }
            });
        };

        // 第一條跑馬燈 (從右到左)
        setupMarquee(marqueeWrapperRef1, marqueeRef1, -1, 30);
        // 第二條跑馬燈 (從左到右)
        setupMarquee(marqueeWrapperRef2, marqueeRef2, 1, 40);

        // 監聽窗口大小變化，調整跑馬燈
        const handleResize = () => {
            setupMarquee(marqueeWrapperRef1, marqueeRef1, -1, 30);
            setupMarquee(marqueeWrapperRef2, marqueeRef2, 1, 40);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            gsap.killTweensOf([marqueeWrapperRef1.current?.children, marqueeWrapperRef2.current?.children]);
            window.removeEventListener('resize', handleResize);
        };
    }, [preferReducedMotion]);

    return (
        <div ref={animationRef} className="relative h-[200vh] overflow-hidden">
            {!preferReducedMotion ? (
                <>
                    {/* 第一條跑馬燈 */}
                    <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none z-50 h-12 sm:h-16 lg:h-20">
                        <div ref={marqueeWrapperRef1} className="flex whitespace-nowrap">
                            <div ref={marqueeRef1} className="flex">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black pr-8 tracking-tight">
                                    歡迎來到互動空間 • 捲動頁面探索更多 • 優質體驗就在這裡 • 
                                    製作有趣的動畫 • 試試看不同效果 • 享受視覺饗宴 •
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 第二條跑馬燈 */}
                    <div className="absolute top-[25%] left-0 w-full overflow-hidden pointer-events-none z-50 h-12 sm:h-16 lg:h-20">
                        <div ref={marqueeWrapperRef2} className="flex whitespace-nowrap">
                            <div ref={marqueeRef2} className="flex">
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black pr-8 tracking-tight">
                                    視覺設計 • 互動體驗 • 動態效果 • 
                                    精心製作 • 響應式佈局 • 精彩無限 •
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 互動球元素 - 大球 */}
                    <div
                        ref={ball1Ref}
                        className="absolute top-[-60px] left-1/3 transform -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 border-2 border-black rounded-full bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg"
                    ></div>
                    <div
                        ref={ball2Ref}
                        className="absolute top-[-60px] left-2/3 transform -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 border-2 border-black rounded-full bg-gradient-to-br from-purple-100 to-purple-200 shadow-lg"
                    ></div>
                    
                    {/* 互動球元素 - 小球 */}
                    <div
                        ref={smallBall1Ref}
                        className="absolute top-[-60px] left-1/4 w-8 h-8 sm:w-10 sm:h-10 border-2 border-black rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md hidden sm:block"
                    ></div>
                    <div
                        ref={smallBall2Ref}
                        className="absolute top-[-60px] left-3/4 w-8 h-8 sm:w-10 sm:h-10 border-2 border-black rounded-full bg-gradient-to-br from-green-100 to-green-200 shadow-md hidden sm:block"
                    ></div>
                    <div
                        ref={smallBall3Ref}
                        className="absolute top-[-50px] left-1/3 w-6 h-6 sm:w-8 sm:h-8 border-2 border-black rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-md hidden sm:block"
                    ></div>
                    <div
                        ref={smallBall4Ref}
                        className="absolute top-[-50px] left-2/3 w-6 h-6 sm:w-8 sm:h-8 border-2 border-black rounded-full bg-gradient-to-br from-pink-100 to-pink-200 shadow-md hidden sm:block"
                    ></div>
                </>
            ) : (
                /* 提供減少動效的靜態替代內容 */
                <div className="py-16 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 tracking-tight">
                            歡迎來到我們的互動空間
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            這裡展示了各種精心設計的互動體驗與視覺效果，
                            是您探索數位創意的絕佳場所。
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['視覺設計', '互動體驗', '動態效果', '精心製作', '響應式佈局'].map((text, i) => (
                                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-gray-800">
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveBallsWithMarquee;