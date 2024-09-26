import React, { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage'; // 引入加載頁面組件

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模擬加載過程
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3秒後隱藏加載頁面
  }, []);

  return (
    <div className="w-full flex flex-col">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="background-image-container">
          {/* 背景圖片區塊 */}
        </div>
      )}
    </div>
  );
}

export default Homepage;