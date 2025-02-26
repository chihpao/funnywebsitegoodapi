import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../components/chatbot/config.jsx';
import MessageParser from '../components/chatbot/MessageParser.js';
import ActionProvider from '../components/chatbot/ActionProvider.js';
import '../styles/chatbot.css'; // 新增自訂樣式檔案

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        {/* 標題區 */}
        <header className="chatbot-header">
          <h1>阿保代理人</h1>
          <p>您的智能助手，隨時為您服務</p>
        </header>
        
        {/* 聊天區域 */}
        <main className="chatbot-main">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatbotPage;