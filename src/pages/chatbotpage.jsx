import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../components/chatbot/config.jsx';
import MessageParser from '../components/chatbot/MessageParser.js';
import ActionProvider from '../components/chatbot/ActionProvider.js';
import '../styles/chatbot.css'; // 自訂樣式檔案

const ChatbotPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 檢查聊天機器人所需要的服務是否可用
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        // 獲取環境變量或使用默認值
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
        console.log("嘗試連接 API:", `${apiBaseUrl}/api/joke`);
        
        // 添加超時設置以避免長時間等待
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超時
        
        // 進行 API 檢查
        const response = await fetch(`${apiBaseUrl}/api/joke`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API 服務返回錯誤，狀態碼: ${response.status}`);
        }
        
        setIsLoading(false);
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
  }, []);

  // 處理聊天機器人保存與載入功能
  const saveMessages = (messages) => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  };
  
  const loadMessages = () => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : null;
  };
  
  // 渲染不同狀態的內容
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="chatbot-loading">
          <div className="spinner"></div>
          <p>聊天機器人正在啟動中...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="chatbot-error">
          <div className="error-icon">⚠️</div>
          <h2>無法載入聊天機器人</h2>
          <p>{error}</p>
          <div className="error-details">
            <p>請嘗試以下步驟:</p>
            <ol>
              <li>確保 API 伺服器已啟動 (<code>npm run dev:server</code>)</li>
              <li>檢查環境變量設置是否正確 (<code>.env.local</code> 文件)</li>
              <li>確認 API 端口與伺服器端口一致 (預設為 3050)</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="reload-btn"
          >
            重新嘗試
          </button>
        </div>
      );
    }
    
    return (
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        saveMessages={saveMessages}
        loadMessages={loadMessages}
      />
    );
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        {/* 標題區 */}
        <header className="chatbot-header">
          <h1>阿保代理人</h1>
          <p>您的智能助手，隨時為您服務</p>
          <div className="chatbot-commands-info">
            <p>
              <strong>可用命令:</strong> /help (幫助), /joke (笑話), 
              /cat (貓圖), /dog (狗圖)
            </p>
          </div>
        </header>
        
        {/* 聊天區域 */}
        <main className="chatbot-main">
          {renderContent()}
        </main>
        
        {/* 頁尾區 */}
        <footer className="chatbot-footer">
          <p>由先進 AI 技術提供支援</p>
          <p className="version">版本: 1.0.0</p>
          <p className="api-info">API 地址: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3050'}</p>
        </footer>
      </div>
    </div>
  );
};

export default ChatbotPage;