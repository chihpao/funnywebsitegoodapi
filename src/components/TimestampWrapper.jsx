import React, { useEffect, useRef } from 'react';

/**
 * 時間戳包裝器組件
 * 將當前時間添加到聊天消息中
 */
const TimestampWrapper = () => {
  const timestampRef = useRef(null);
  
  useEffect(() => {
    // 添加時間戳到所有訊息
    const addTimestamps = () => {
      // 獲取所有聊天訊息元素
      const botMessages = document.querySelectorAll('.react-chatbot-kit-chat-bot-message');
      const userMessages = document.querySelectorAll('.react-chatbot-kit-user-chat-message');
      
      // 添加時間戳到機器人訊息
      botMessages.forEach(message => {
        if (!message.hasAttribute('data-time')) {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          message.setAttribute('data-time', timeString);
        }
      });
      
      // 添加時間戳到用戶訊息
      userMessages.forEach(message => {
        if (!message.hasAttribute('data-time')) {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          message.setAttribute('data-time', timeString);
        }
      });
    };
    
    // 初始執行一次
    addTimestamps();
    
    // 設置一個MutationObserver來監聽聊天容器變化
    const observer = new MutationObserver(addTimestamps);
    
    // 獲取聊天容器
    const chatContainer = document.querySelector('.react-chatbot-kit-chat-message-container');
    
    if (chatContainer) {
      // 開始觀察
      observer.observe(chatContainer, {
        childList: true,
        subtree: true
      });
    }
    
    // 清理函數
    return () => {
      observer && observer.disconnect();
    };
  }, []);
  
  // 這是一個無實際渲染的組件，只用於功能增強
  return <div ref={timestampRef} style={{ display: 'none' }}></div>;
};

export default TimestampWrapper;
