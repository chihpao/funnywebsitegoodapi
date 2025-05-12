import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

// 聊天機器人組件
import config from '../components/chatbot/config.jsx';
import MessageParser from '../components/chatbot/MessageParser.js';
import ActionProvider from '../components/chatbot/ActionProvider.js';

// 樣式
import '../styles/chatbot.css';

// 圖標
import { 
  FiHelpCircle, 
  FiMessageCircle, 
  FiRefreshCw, 
  FiAlertTriangle, 
  FiX 
} from 'react-icons/fi';

/**
 * 聊天機器人頁面組件
 * 提供全屏聊天界面與 API 連接檢查功能
 */
const ChatbotPage = () => {
  // 狀態管理
  const [isLoading, setIsLoading] = useState(true);  // 加載狀態
  const [error, setError] = useState(null);          // 錯誤信息
  const [typingEffect, setTypingEffect] = useState(false); // 打字效果
  const chatContainerRef = useRef(null);            // 聊天容器引用
  
  /**
   * 檢查聊天機器人所需要的 API 服務是否可用
   */
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        // 獲取環境變量或使用默認值
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
        console.log("嘗試連接 API:", `${apiBaseUrl}/api/joke`);
        
        // 添加超時設置以避免長時間等待
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超時
        
        // 進行 API 檢查 - 使用笑話 API 作為健康檢查端點
        const response = await fetch(`${apiBaseUrl}/api/joke`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API 服務返回錯誤，狀態碼: ${response.status}`);
        }
        
        // 模擬載入效果，讓用戶體驗更流暢
        setTimeout(() => {
          setIsLoading(false);
          setTypingEffect(true);
        }, 1500);
      } catch (error) {
        console.error('聊天機器人 API 檢查失敗:', error);
        
        // 更詳細的錯誤信息
        if (error.name === 'AbortError') {
          setError('連接超時。請確保 API 服務器正在運行。');
        } else if (error.message.includes('Failed to fetch')) {
          setError('無法連接到 API 服務器。請確保伺服器正在運行且端口配置正確。');
        } else {
          setError(`API 檢查失敗: ${error.message}`);
        }
        
        setIsLoading(false);
      }
    };
    
    checkApiAvailability();
    
    /**
     * 處理窗口大小變化時滾動到底部
     * 確保聊天內容在調整窗口大小後仍然可見
     */
    const handleResize = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    
    // 添加和清除事件監聽器
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * 聊天記錄持久化功能
   */
  // 保存聊天記錄到本地存儲
  const saveMessages = (messages) => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  };
  
  // 從本地存儲加載聊天記錄
  const loadMessages = () => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : null;
  };
  
  /**
   * 清除聊天歷史記錄並重新加載頁面
   */
  const clearChatHistory = () => {
    localStorage.removeItem('chatMessages');
    window.location.reload();
  };
  
  /**
   * 根據不同狀態渲染對應的內容
   * 處理加載中、錯誤和正常聊天三種狀態
   */
  const renderContent = () => {
    // 加載中狀態
    if (isLoading) {
      return (
        <div className="chatbot-loading">
          <div className="spinner"></div>
          <p>聊天機器人正在啟動中...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      );
    }
    
    // 錯誤狀態
    if (error) {
      return (
        <div className="chatbot-error">
          <div className="error-icon"><FiAlertTriangle /></div>
          <h2>無法載入聊天機器人</h2>
          <p>{error}</p>
          <div className="error-details">
            <p>請嘗試以下步驟:</p>
            <ol>
              <li>確保 API 伺服器已啟動 (<code>npm run dev:chatbot</code>)</li>
              <li>檢查環境變量設置是否正確 (<code>.env.local</code> 文件)</li>
              <li>確認 API 端口與伺服器端口一致 (預設為 10000)</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="reload-btn"
          >
            <FiRefreshCw className="icon" /> 重新嘗試
          </button>
        </div>
      );
    }
    
    // 正常聊天狀態
    return (
      <div className="chatbot-wrapper" ref={chatContainerRef}>
        {typingEffect && <div className="typing-indicator">AI 正在思考中...</div>}
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          saveMessages={saveMessages}
          loadMessages={loadMessages}
        />
      </div>
    );
  };

  return (
    <div className="chatbot-fullpage">
      {/* 退出按鈕 - 返回首頁 */}
      <Link to="/" className="exit-button" title="退出智能助手">
        <FiX />
        <span>退出</span>
      </Link>

      <div className="chatbot-fullpage-container">
        {/* 標題區 - 顯示聊天機器人名稱和可用命令 */}
        <header className="chatbot-header">
          <div className="chatbot-header-content">
            <h1>
              <FiMessageCircle className="header-icon" />
              阿保智能助手
            </h1>
          </div>
          
          {/* 命令提示區 - 顯示可用的聊天命令 */}
          <div className="chatbot-commands-info">
            <div className="commands-inline">
              <FiHelpCircle className="commands-icon" />
              <strong>可用命令:</strong>
              <span className="command-tag">/help</span>
              <span className="command-tag">/joke</span>
              <span className="command-tag">/cat</span>
              <span className="command-tag">/dog</span>
            </div>
          </div>
          
          {/* 清除記錄按鈕 - 僅在聊天機器人正常加載時顯示 */}
          {!isLoading && !error && (
            <button 
              onClick={clearChatHistory} 
              className="clear-history-btn"
              title="清除聊天記錄"
            >
              <FiRefreshCw /> 清除記錄
            </button>
          )}
        </header>
        
        {/* 聊天主區域 - 顯示聊天內容 */}
        <main className="chatbot-main-wrapper">
          <div className="chatbot-main">
            {renderContent()}
          </div>
        </main>
        
        {/* 頁尾區 - 顯示版本和 API 信息 */}
        <footer className="chatbot-footer">
          <div className="footer-content">
            <p>由先進 AI 技術提供支援</p>
            <div className="footer-meta">
              <p className="version">版本: 1.2.0</p>
              <p className="api-info">API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000'}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatbotPage;