import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "阿保AI Agent",
  initialMessages: [
    createChatBotMessage("您好！我是阿保保保，請問有什麼可以為您服務的嗎？")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#4F46E5',
      color: 'white',
    },
    chatButton: {
      backgroundColor: '#4F46E5',
      borderRadius: '0.375rem',
      border: 'none',
    },
  },
  // 添加一些基本選項
  placeholderText: '請輸入您的問題...',
  width: '100%',
  height: '100%',
};

export default config;