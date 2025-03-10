class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    console.log("ActionProvider 已初始化");
  }
  
  // 主要處理使用者訊息的方法
  handleMessage = async (message) => {
    console.log("handleMessage 被調用，訊息內容:", message);
    try {
      // 呼叫 API 取得回應
      const data = await this.callAPI(message);
      
      // 建立機器人回應訊息
      const botMessage = this.createChatBotMessage(data.reply);
      console.log("建立聊天機器人訊息:", botMessage);
      
      // 更新聊天狀態
      this.updateChatbotState(botMessage);
    } catch (error) {
      this.handleError(error);
    }
  };
  
  // 處理問候訊息
  handleGreeting() {
    console.log("handleGreeting 被調用");
    const greetingMessage = this.createChatBotMessage("您好！很高興與您聊天。");
    console.log("建立問候訊息:", greetingMessage);
    this.updateChatbotState(greetingMessage);
  }
  
  // API 呼叫抽離成獨立函數
  async callAPI(message) {
    console.log("準備發送 API 請求到 Render 部署的後端");
    const response = await fetch('https://funnywebsitegoodapi.onrender.com/api/chatbot', {
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
    return data;
  }
  
  // 錯誤處理抽離成獨立函數
  handleError(error) {
    console.error('發生錯誤:', error);
    console.error('錯誤詳情:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // 根據錯誤類型生成適當的錯誤訊息
    let errorMsg = "與 AI 小幫手溝通時發生錯誤，請稍後再試。";
    
    if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
      errorMsg = "網路連接問題，無法連接到 AI 服務。";
    } else if (error.message.includes("API 密鑰")) {
      errorMsg = "AI 服務配置問題，請聯繫管理員。";
    } else if (error.message && !error.message.includes("HTTP error")) {
      // 如果有具體的錯誤訊息但不是標準 HTTP 錯誤
      errorMsg = `錯誤: ${error.message}`;
    }
    
    const errorMessage = this.createChatBotMessage(errorMsg);
    console.log("建立錯誤訊息:", errorMessage);
    
    this.updateChatbotState(errorMessage);
  }

  // 更新聊天機器人狀態
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