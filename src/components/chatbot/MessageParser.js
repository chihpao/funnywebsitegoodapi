class MessageParser {
  constructor(actionProvider, config) {
    this.actionProvider = actionProvider;
    this.config = config;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase(); // 將使用者訊息轉換為小寫，方便比對

    if (lowerCaseMessage.includes("你好") || lowerCaseMessage.includes("您好") || lowerCaseMessage.includes("哈囉")) {
      this.actionProvider.handleGreeting(); // 如果訊息包含問候語，則調用 ActionProvider 中的問候處理函數
    } else {
      this.actionProvider.handleUserMessage(message); // 否則，將使用者訊息傳遞給 ActionProvider 進行一般訊息處理 (例如發送給後端 AI 代理人)
    }
  }
}

export default MessageParser;