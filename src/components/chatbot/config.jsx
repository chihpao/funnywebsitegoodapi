import { createChatBotMessage } from 'react-chatbot-kit';
import ImageWidget from './widgets/ImageWidget';

const config = {
  botName: "阿保AI Agent",
  initialMessages: [
    createChatBotMessage("您好！我是阿保保保，請問有什麼可以為您服務的嗎？"),
    createChatBotMessage("您可以輸入 /help 查看所有可用命令。")
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
  
  // 註冊小部件
  widgets: [
    {
      widgetName: 'imageWidget',
      widgetFunc: (props) => <ImageWidget {...props} />,
    },
    // 您可以在這裡添加更多小部件
  ],
  
  // 自定義狀態
  customComponents: {
    // 如果需要自定義標頭、頁尾等組件
    // header: (props) => <CustomHeader {...props} />,
  },
  
  // 狀態管理
  state: {
    // 可以添加初始狀態
    userInfo: null,
    conversations: [],
  }
};

export default config;