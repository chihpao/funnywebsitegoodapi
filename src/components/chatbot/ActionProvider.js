import { ApiService } from '../../services/api';
import { ChatUtils } from '../../utils/chatUtils';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    console.log("ActionProvider 已初始化");
  }
  
  /**
   * 主要處理使用者訊息的方法
   * @param {string} message - 使用者輸入的訊息
   */
  handleMessage = async (message) => {
    console.log("handleMessage 被調用，訊息內容:", message);
    
    try {
      // 檢測是否為特殊命令
      const command = ChatUtils.detectCommand(message);
      
      if (command) {
        // 處理特殊命令
        await this.handleCommand(command);
      } else {
        // 常規對話處理
        await this.handleChatbotResponse(message);
      }
    } catch (error) {
      this.handleError(error);
    }
  };
  
  /**
   * 處理常規聊天回應
   * @param {string} message - 使用者訊息
   */
  async handleChatbotResponse(message) {
    // 呼叫 API 服務層取得回應
    const data = await ApiService.sendChatMessage(message);
    
    // 格式化並建立機器人回應訊息
    const formattedReply = ChatUtils.formatBotMessage(data.reply);
    const botMessage = this.createChatBotMessage(formattedReply);
    console.log("建立聊天機器人訊息:", botMessage);
    
    // 更新聊天狀態
    this.updateChatbotState(botMessage);
  }
  async handleCommand(command) {
    console.log("處理特殊命令:", command);
    
    switch (command.type) {
      case "HELP":
        this.handleHelp();
        break;
        
      case "JOKE":
        await this.handleJoke();
        break;
        
      case "CAT":
        await this.handleCat();
        break;
        
      case "DOG":
        await this.handleDog();
        break;
        
      default:
        // 未知命令，使用默認處理
        await this.handleChatbotResponse(command.type);
    }
  }
  
  /**
   * 處理 /help 命令
   */
  handleHelp() {
    const helpMessage = this.createChatBotMessage(
      "可用命令:<br>" +
      "/help - 顯示此幫助訊息<br>" +
      "/joke - 獲取隨機笑話<br>" +
      "/cat - 獲取隨機貓咪圖片<br>" +
      "/dog - 獲取隨機狗狗圖片"
    );
    this.updateChatbotState(helpMessage);
  }
  
  /**
   * 處理 /joke 命令
   */
  async handleJoke() {
    try {
      const jokeData = await ApiService.getRandomJoke();
      const jokeMessage = this.createChatBotMessage(
        `${jokeData.setup}<br><br>${jokeData.punchline}`
      );
      this.updateChatbotState(jokeMessage);
    } catch (error) {
      this.handleApiError(error, "無法獲取笑話，請稍後再試。");
    }
  }
  
  /**
   * 處理 /cat 命令
   */
  async handleCat() {
    try {
      const catsData = await ApiService.getRandomCats();
      if (catsData && catsData.length > 0) {
        const catImage = catsData[0].url;
        const catMessage = this.createChatBotMessage(
          "這是一隻可愛的貓咪:",
          {
            widget: "imageWidget",
            payload: { src: catImage, alt: "Random Cat" }
          }
        );
        this.updateChatbotState(catMessage);
      } else {
        throw new Error("找不到貓咪圖片");
      }
    } catch (error) {
      this.handleApiError(error, "無法獲取貓咪圖片，請稍後再試。");
    }
  }
  
  /**
   * 處理 /dog 命令
   */
  async handleDog() {
    try {
      const dogsData = await ApiService.getRandomDogs();
      if (dogsData && dogsData.message && dogsData.message.length > 0) {
        const dogImage = dogsData.message[0];
        const dogMessage = this.createChatBotMessage(
          "這是一隻可愛的狗狗:",
          {
            widget: "imageWidget",
            payload: { src: dogImage, alt: "Random Dog" }
          }
        );
        this.updateChatbotState(dogMessage);
      } else {
        throw new Error("找不到狗狗圖片");
      }
    } catch (error) {
      this.handleApiError(error, "無法獲取狗狗圖片，請稍後再試。");
    }
  }
  
  /**
   * 處理問候訊息
   */
  handleGreeting() {
    console.log("handleGreeting 被調用");
    const greetingMessage = this.createChatBotMessage("您好！很高興與您聊天。我是 TaTa 的 AI 助手，有什麼我能幫您的嗎？");
    console.log("建立問候訊息:", greetingMessage);
    this.updateChatbotState(greetingMessage);
  }
  
  /**
   * 錯誤處理函數
   * @param {Error} error - 錯誤對象
   */
  handleError(error) {
    console.error('發生錯誤:', error);
    console.error('錯誤詳情:', {
      name: error.name,
      message: error.message,
      code: error.code || 'UNKNOWN',
      stack: error.stack
    });
    
    // 使用 ChatUtils 取得友好的錯誤訊息
    const errorMsg = ChatUtils.getFriendlyErrorMessage(error);
    
    const errorMessage = this.createChatBotMessage(errorMsg);
    console.log("建立錯誤訊息:", errorMessage);
    
    this.updateChatbotState(errorMessage);
  }

  /**
   * API 錯誤處理輔助函數
   * @param {Error} error - 錯誤對象
   * @param {string} defaultMessage - 預設錯誤訊息
   */
  handleApiError(error, defaultMessage) {
    console.error('API 錯誤:', error);
    const errorMessage = this.createChatBotMessage(defaultMessage);
    this.updateChatbotState(errorMessage);
  }

  /**
   * 更新聊天機器人狀態
   * @param {Object} message - 聊天機器人訊息對象
   */
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