import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const InteractiveBallsWithMarquee = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
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
        gsap.to(ball1Ref.current, { x: -100 * scrollProgress, y: 200 * scrollProgress, scale: 1 + scrollProgress });
        gsap.to(ball2Ref.current, { x: 100 * scrollProgress, y: 200 * scrollProgress, scale: 1 + scrollProgress });
        gsap.to([smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current], {
            y: 500 * scrollProgress,
            rotate: 360 * scrollProgress,
            scale: 1 + scrollProgress * 0.5
        });

        if (scrollProgress > 0.5) {
            gsap.to(ball1Ref.current, { borderColor: '#000', duration: 0.5 });
            gsap.to(ball2Ref.current, { borderColor: '#000', duration: 0.5 });
            gsap.to(
                [smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current],
                { borderColor: '#000', duration: 0.5 }
            );
        } else {
            gsap.to(ball1Ref.current, { borderColor: '#fff', duration: 0.5 });
            gsap.to(ball2Ref.current, { borderColor: '#fff', duration: 0.5 });
            gsap.to(
                [smallBall1Ref.current, smallBall2Ref.current, smallBall3Ref.current, smallBall4Ref.current],
                { borderColor: '#fff', duration: 0.5 }
            );
        }
    }, [scrollProgress]);

    useEffect(() => {
        const setupMarquee = (wrapperRef, contentRef) => {
            const contentWidth = contentRef.current.offsetWidth;
            const clone = contentRef.current.cloneNode(true);
            wrapperRef.current.appendChild(clone);

            gsap.to(wrapperRef.current.children, {
                x: `-=${contentWidth}`,
                duration: 20,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
                }
            });
        };

        setupMarquee(marqueeWrapperRef1, marqueeRef1);
        setupMarquee(marqueeWrapperRef2, marqueeRef2);

        return () => {
            gsap.killTweensOf([marqueeWrapperRef1.current?.children, marqueeWrapperRef2.current?.children]);
        };
    }, []);

    return (
        <div className="relative h-[200vh]">
            <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none z-50 h-12">
                <div ref={marqueeWrapperRef1} className="flex whitespace-nowrap">
                    <div ref={marqueeRef1} className="flex">
                        <p className="text-4xl font-bold text-black pr-8">
                            這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 
                            這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 • 這是第一段跑馬燈文字 •
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute top-[25%] left-0 w-full overflow-hidden pointer-events-none z-50 h-12">
                <div ref={marqueeWrapperRef2} className="flex whitespace-nowrap">
                    <div ref={marqueeRef2} className="flex">
                        <p className="text-4xl font-bold text-black pr-8">
                            這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 
                            這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 • 這是第二段跑馬燈文字 •
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={ball1Ref}
                className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-black rounded-full"
            ></div>
            <div
                ref={ball2Ref}
                className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-black rounded-full"
            ></div>
            <div
                ref={smallBall1Ref}
                className="absolute top-[-60px] left-1/4 w-10 h-10 border-2 border-black rounded-full"
            ></div>
            <div
                ref={smallBall2Ref}
                className="absolute top-[-60px] left-3/4 w-10 h-10 border-2 border-black rounded-full"
            ></div>
            <div
                ref={smallBall3Ref}
                className="absolute top-[-50px] left-1/3 w-8 h-8 border-2 border-black rounded-full"
            ></div>
            <div
                ref={smallBall4Ref}
                className="absolute top-[-50px] left-2/3 w-8 h-8 border-2 border-black rounded-full"
            ></div>
        </div>
    );
};

export default InteractiveBallsWithMarquee;