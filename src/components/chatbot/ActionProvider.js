class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleMessage = async (message) => {
    try {
      // 使用相對路徑，這樣在 Vercel 上會自動使用相同域名
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = this.createChatBotMessage(data.reply);
      
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = this.createChatBotMessage("與 AI 小幫手溝通時發生錯誤，請稍後再試。");
      
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };
  handleGreeting() {
    const greetingMessage = this.createChatBotMessage("您好！很高興與您聊天。");
    this.updateChatbotState(greetingMessage);
  }

  handleUserMessage = async (message) => {
    console.log("User message in ActionProvider:", message);

    try {
      const response = await fetch('/api/chatbot', { // 調用後端 API 端點 /api/chatbot
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // 將使用者訊息以 JSON 格式傳遞給後端
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // 處理 API 錯誤
      }

      const data = await response.json(); // 解析 API 回應 JSON
      console.log("API response:", data);

      const botMessage = this.createChatBotMessage(data.reply); // 假設 API 回應的 JSON 中包含 'reply' 字段，作為 AI 回覆
      this.updateChatbotState(botMessage); // 更新 chatbot 狀態，顯示 AI 回覆

    } catch (error) {
      console.error("API 呼叫錯誤:", error);
      const errorMessage = this.createChatBotMessage("與AI小幫手溝通時發生錯誤，請稍後再試。");
      this.updateChatbotState(errorMessage); // 顯示錯誤訊息
    }
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;