import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "阿保AI Agent", // 設定機器人名稱
  initialMessages: [                 // 設定 chatbot 啟動時的初始訊息
    createChatBotMessage("您好！我是阿保保保，請問有什麼可以為您服務的嗎？")
  ],
  customStyles: {                   // 自訂 chatbot UI 樣式
    botMessageBox: {               // 機器人訊息框樣式
      backgroundColor: '#3778c2',   // 背景顏色
      color: 'white',             // 文字顏色
    },
    chatButton: {                  // 聊天按鈕樣式
      backgroundColor: '#3778c2',   // 背景顏色
      borderRadius: '5px',        // 邊框圓角
      border: 'none',             // 移除邊框
    },
  },
  //  widget 可以在 chatbot UI 中加入互動組件 (例如按鈕、連結等)，這裡先不使用
  //  widgets: [...]
};

export default config;