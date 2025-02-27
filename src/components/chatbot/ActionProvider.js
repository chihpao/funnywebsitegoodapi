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
        // 嘗試解析錯誤回應中的詳細資訊
        const errorData = await response.json().catch(() => ({}));
        console.error("API 返回錯誤:", errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
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
      
      // 更好的錯誤訊息處理
      let errorMsg = "與 AI 小幫手溝通時發生錯誤，請稍後再試。";
      
      // 如果有特定錯誤類型，顯示更具體的訊息
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        errorMsg = "網路連接問題，無法連接到 AI 服務。";
      } else if (error.message.includes("API 密鑰")) {
        errorMsg = "AI 服務配置問題，請聯繫管理員。";
      }
      
      const errorMessage = this.createChatBotMessage(errorMsg);
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
        // 嘗試解析錯誤回應中的詳細資訊
        const errorData = await response.json().catch(() => ({}));
        console.error("API 返回錯誤 (在 handleUserMessage 中):", errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
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
      
      // 更好的錯誤訊息處理
      let errorMsg = "與 AI 小幫手溝通時發生錯誤，請稍後再試。";
      
      // 如果有特定錯誤類型，顯示更具體的訊息
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        errorMsg = "網路連接問題，無法連接到 AI 服務。";
      } else if (error.message.includes("API 密鑰")) {
        errorMsg = "AI 服務配置問題，請聯繫管理員。";
      } else if (error.message && !error.message.includes("HTTP error")) {
        // 如果有具體的錯誤訊息但不是標準 HTTP 錯誤
        errorMsg = `錯誤: ${error.message}`;
      }
      
      const errorMessage = this.createChatBotMessage(errorMsg);
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