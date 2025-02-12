import React, { useState, useEffect } from 'react';
import { moveAnimation01 } from '../components/IntComText.jsx';
import InteractiveBallsWithMarquee from '../components/InteractiveBallsWithMarquee.jsx';

const InteractiveComponent = () => {
  // 名字動畫State
  const names = ['小保', '智強', 'Bill'];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);

  // 年份動畫的State（獨立狀態）
  const [animatingOutYear, setAnimatingOutYear] = useState(false);
  const [animatingInYear, setAnimatingInYear] = useState(false);

  // 名字切換，每 2850 毫秒
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingOut(true); // 觸發舊文字往上淡出
      setTimeout(() => {
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
        setAnimatingOut(false);
        setAnimatingIn(true); // 新文字從下進入
        setTimeout(() => {
          setAnimatingIn(false);
        }, 500); // 與 CSS 動畫時間一致
      }, 500);
    }, 2850);
    return () => clearInterval(interval);
  }, []);

  // 年份 (2022) 切換，每 3000 毫秒
  useEffect(() => {
    const intervalYear = setInterval(() => {
      setAnimatingOutYear(true);
      setTimeout(() => {
        setAnimatingOutYear(false);
        setAnimatingInYear(true);
        setTimeout(() => {
          setAnimatingInYear(false);
        }, 500);
      }, 500);
    }, 3000);
    return () => clearInterval(intervalYear);
  }, []);

  // 載入 lottie-player script
  useEffect(() => {
    if (!customElements.get('lottie-player')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <div className="p-4">
        {moveAnimation01}
        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html: `<lottie-player src="https://lottie.host/09c5791a-cce0-4f1a-9c4d-ae566c66f782/TdlWd2BQ6h.json" background="##FFFFFF" speed="1" style="width: 300px; height: 300px" loop autoplay></lottie-player>`,
              }}
            />
          </div>
          <div className="container mx-auto text-left">
            <div className="text-lg">
              嗨，我是
              <div className="highlight-blackbg mt-4">
                <div
                  className={`highlight-content ${animatingOut ? 'animate-out' : animatingIn ? 'animate-in' : ''} text-white`}
                >
                  {names[currentNameIndex]}
                </div>
              </div>
              ，今年 29 歲，從非營利組織華麗轉身到資訊業，這個跳躍之大，堪比珍珠奶茶裡的珍珠從杯底被吸到嘴裡。我以前當社工，專攻疾病議題和身心障礙議題，天天扮演「社會問題的 Debugger」。現在呢，跑到 IV&V 的專案當專案人員，檢查系統漏洞，但其實最大的漏洞可能是我自己──因為我對新環境的崩潰速度超過系統。
            </div>
            <div className="text-lg mt-4">
              身高不高也不矮，體重嘛，突破了 70 公斤，我正在努力減肥，但體重計每天都像在開玩笑：「你確定要站上來嗎？」目前處於人生最重時期，目標是減到讓我可以重新相信鏡子的友情。如果珍珠奶茶消失，我大概也會隨之倒下。
            </div>
            <div className="text-lg mt-4">
              <div className="highlight-whitebg mt-4">
                <div
                  className={`highlight-content ${animatingOutYear ? 'animate-out' : animatingInYear ? 'animate-in' : ''}`}
                >
                  2022
                </div>
              </div>
              年我從台科大的產業新尖兵計畫畢業，之後為了不被技術時代拋棄，2023 和 2024 年拼命跑去台大的資訊系統訓練班學 React 和 Node.js。現階段對程式碼的理解可以用一句話總結：「我懂，但好像又不太懂。」經常是一邊 Google，一邊懷疑自己是不是進了什麼奇怪的領域，但我努力不讓 IDE 裡的紅色錯誤訊息搶戲。
            </div>
            <div className="text-lg mt-4">
              說到美感，我也嘗試過培養，但說不上好。當我覺得一個網頁設計還不錯時，同事說它像 2000 年代的作品；而當我真的認為它醜爆了，反而會有人誇「這簡約風很有味道啊！」這讓我意識到，美感在程式圈是個稀缺品。雖然我的美感只能打個及格分，但如果我不算有美感，那大部分資訊和程式領域的朋友恐怕只能算是「美感黑洞」吧！
            </div>
            <div className="text-lg mt-4">
              所以，現在的我每天都在生活與工作中尋找平衡：減肥和珍奶之間，代碼和美感之間，笑點和 Bug 之間。誰說資訊人員一定枯燥無聊？就算程式寫得半調子，我也要當最有趣的那個！
            </div>
            <hr className="w-full border-none h-0.5 bg-gradient-to-r from-black via-transparent to-black my-5 animate-gradient" />
            <div className="text-2xl animate-move mt-4 font-bold">關於現在和未來</div>
            <div className="text-xl mt-4 animate-fade-in-up">
              在時間的長河中，現在是唯一的真實，未來是無限的可能。每一刻的選擇，都在塑造我們的命運。
            </div>
            <hr className="w-full border-none h-0.5 bg-gradient-to-r from-black via-transparent to-black my-5 animate-gradient" />
          </div>
        </div>
        <InteractiveBallsWithMarquee />
      </div>
    </>
  );
};

export default InteractiveComponent;