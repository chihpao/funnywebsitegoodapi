import React, { useState, useEffect } from 'react';
import '../styles/chatbot.css';

/**
 * 打字指示器組件
 * 當機器人正在「打字」時顯示動態指示器
 */
const TypingIndicator = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="typing-indicator">
      <div className="typing-indicator-bubble">
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
