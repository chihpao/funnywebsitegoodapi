import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 佈局組件
import NavBar from './components/NavBar';
import SkinnyFooter from './components/SkinnyFooter';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

// 頁面組件
import HomePage from './pages/HomePage';
import FunComponent, { MemesPage, CatsPage, DogsPage } from './pages/FunComponent';
import InteractiveComponent from './pages/InteractiveComponent';
import AppChatbot from './pages/chatbotpage';
import LoadingPage from './pages/LoadingPage';

// 未使用的頁面 (已註解)
// import API from './pages/apiPage';

/**
 * 根應用組件
 * 作為應用程序的入口點，處理加載狀態和路由配置
 */
function App() {
  // 狀態管理
  const [isLoading, setIsLoading] = useState(true);
  const isNonTouchDevice = window.matchMedia('(pointer: fine)').matches;

  // 模擬加載過程
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // 顯示加載頁面
  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      {/* 僅在非觸控設備上顯示自定義游標 */}
      {isNonTouchDevice && <CustomCursor />}
      
      <div className="min-h-screen bg-white">
        {/* 頁面頂部導航欄 */}
        <NavBar />
        
        {/* 應用路由配置 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aiagent" element={<AppChatbot />} />
          <Route path="/fun" element={<FunComponent />} />
          <Route path="/fun/memes" element={<MemesPage />} />
          <Route path="/fun/cats" element={<CatsPage />} />
          <Route path="/fun/dogs" element={<DogsPage />} />
          <Route path="/interactive" element={<InteractiveComponent />} />
          {/* <Route path="/api" element={<API />} /> */}
        </Routes>
        
        {/* 回到頂部按鈕 */}
        <ScrollToTop />
        
        {/* 頁面底部 */}
        <SkinnyFooter />
      </div>
    </Router>
  );
}

export default App;