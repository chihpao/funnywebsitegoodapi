class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    console.log("ActionProvider 已初始化");
  }
  
  handleMessage = async (message) => {
    console.log("handleMessage 被調用，訊息內容:", message);
    try {
      console.log("準備發送 API 請求到 /api/chatbot");
      // 使用相對路徑，這樣在 Vercel 上會自動使用相同域名
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      console.log("API 回應狀態碼:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("API 回應 OK，解析 JSON 資料");
      const data = await response.json();
      console.log("解析後的回應資料:", data);
      
      const botMessage = this.createChatBotMessage(data.reply);
      console.log("建立聊天機器人訊息:", botMessage);
      
      this.setState((prev) => {
        console.log("更新聊天狀態，添加機器人訊息");
        return {
          ...prev,
          messages: [...prev.messages, botMessage],
        };
      });
    } catch (error) {
      console.error('發生錯誤:', error);
      console.error('錯誤詳情:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      const errorMessage = this.createChatBotMessage("與 AI 小幫手溝通時發生錯誤，請稍後再試。");
      console.log("建立錯誤訊息:", errorMessage);
      
      this.setState((prev) => {
        console.log("更新聊天狀態，添加錯誤訊息");
        return {
          ...prev,
          messages: [...prev.messages, errorMessage],
        };
      });
    }
  };
  
  handleGreeting() {
    console.log("handleGreeting 被調用");
    const greetingMessage = this.createChatBotMessage("您好！很高興與您聊天。");
    console.log("建立問候訊息:", greetingMessage);
    this.updateChatbotState(greetingMessage);
  }

  handleUserMessage = async (message) => {
    console.log("handleUserMessage 被調用，訊息內容:", message);

    try {
      console.log("準備發送 API 請求到 /api/chatbot (在 handleUserMessage 中)");
      const response = await fetch('/api/chatbot', { // 調用後端 API 端點 /api/chatbot
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // 將使用者訊息以 JSON 格式傳遞給後端
      });

      console.log("API 回應狀態碼 (在 handleUserMessage 中):", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // 處理 API 錯誤
      }

      console.log("API 回應 OK，解析 JSON 資料 (在 handleUserMessage 中)");
      const data = await response.json(); // 解析 API 回應 JSON
      console.log("解析後的回應資料 (在 handleUserMessage 中):", data);

      const botMessage = this.createChatBotMessage(data.reply); // 假設 API 回應的 JSON 中包含 'reply' 字段，作為 AI 回覆
      console.log("建立聊天機器人訊息 (在 handleUserMessage 中):", botMessage);
      
      this.updateChatbotState(botMessage); // 更新 chatbot 狀態，顯示 AI 回覆

    } catch (error) {
      console.error("API 呼叫錯誤 (在 handleUserMessage 中):", error);
      console.error('錯誤詳情 (在 handleUserMessage 中):', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      const errorMessage = this.createChatBotMessage("與AI小幫手溝通時發生錯誤，請稍後再試。");
      console.log("建立錯誤訊息 (在 handleUserMessage 中):", errorMessage);
      
      this.updateChatbotState(errorMessage); // 顯示錯誤訊息
    }
  }

  updateChatbotState(message) {
    console.log("updateChatbotState 被調用，訊息:", message);
    this.setState(prevState => {
      console.log("更新聊天狀態，之前的訊息數量:", prevState.messages.length);
      return {
        ...prevState, 
        messages: [...prevState.messages, message]
      };
    });
    console.log("聊天狀態更新完成");
  }
}

export default ActionProvider;