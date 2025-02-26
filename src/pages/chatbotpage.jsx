import React from 'react';
import AppChatbot from '../components/Chatbot';

const ChatbotPage = () => {
  const styles = {
    chatbotContainer: {
      '& .react-chatbot-kit-chat-container': {
        width: '100% !important',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        height: '100%',  // 改為 100% 高度
      },
      '& .react-chatbot-kit-chat-message-container': {
        height: '100% !important',  // 改為 100% 高度
        background: '#f8fafc',
      },
      '& .react-chatbot-kit-chat-bot-message': {
        margin: '0.75rem',
        padding: '1rem 1.25rem',
        borderRadius: '1rem',
        backgroundColor: '#1d4ed8 !important',
        color: 'white',
        fontSize: '1rem',
      },
      '& .react-chatbot-kit-user-chat-message': {
        backgroundColor: '#e2e8f0 !important',
        color: '#1e293b',
        fontSize: '1rem',
        margin: '0.75rem',
        padding: '1rem 1.25rem',
      },
      '& .react-chatbot-kit-chat-input': {
        borderRadius: '0.5rem',
        padding: '1rem',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* 標題區塊 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">阿保代理人</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            您的智能助手，隨時為您服務
          </p>
        </div>

        {/* 聊天機器人容器 */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col h-[calc(100vh-200px)]">
          {/* 介紹文字 */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg flex-none">
            <p className="text-gray-700 text-sm sm:text-base">
              👋 歡迎使用我的AI助手！我可以幫您：
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• 回答各種問題</li>
              <li>• 提供專業建議</li>
              <li>• 協助解決問題</li>
            </ul>
          </div>

          {/* 聊天機器人 */}
          <div className="flex-grow overflow-hidden rounded-lg"
               style={styles.chatbotContainer}>
            <AppChatbot />
          </div>
        </div>

        {/* 底部資訊 */}
        <div className="mt-4 text-center text-xs sm:text-sm text-gray-500">
          <p>Powered by 阿保保保• 24/7 為您服務</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;