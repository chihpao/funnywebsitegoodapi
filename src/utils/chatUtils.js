/**
 * 聊天相關的工具函數
 */
export const ChatUtils = {
    /**
     * 根據輸入訊息類型生成友好的錯誤訊息
     * @param {Error} error - 錯誤對象
     * @returns {string} - 友好的錯誤訊息
     */
    getFriendlyErrorMessage(error) {
      if (!error) return "發生未知錯誤，請稍後再試。";
  
      // 根據錯誤代碼提供友好訊息
      switch (error.code) {
        case "NETWORK_ERROR":
          return "網路連接問題，無法連接到 AI 服務。請檢查您的網路連接。";
          
        case "TIMEOUT_ERROR":
          return "請求超時，伺服器回應時間過長。請稍後再試。";
          
        case "AUTH_ERROR":
          return "AI 服務授權問題，請聯繫網站管理員。";
          
        case "RATE_LIMIT_ERROR":
          return "請求頻率過高，請稍後再試。";
          
        default:
          // 如果錯誤訊息提到特定問題，則返回該錯誤訊息
          if (error.message && !error.message.includes("HTTP error")) {
            return `錯誤: ${error.message}`;
          }
          
          // 默認錯誤訊息
          return "與 AI 小幫手溝通時發生錯誤，請稍後再試。";
      }
    },
  
    /**
     * 處理聊天機器人訊息
     * @param {string} message - 收到的聊天訊息
     * @returns {string} - 處理後的訊息
     */
    formatBotMessage(message) {
      if (!message) return "";
      
      // 移除多餘空白
      let formattedMsg = message.trim();
      
      // 處理換行符，確保在 HTML 中正確顯示
      formattedMsg = formattedMsg.replace(/\n/g, '<br>');
      
      return formattedMsg;
    },
    
    /**
     * 檢測特定命令
     * @param {string} message - 用戶訊息
     * @returns {Object|null} - 命令對象或 null
     */
    detectCommand(message) {
      if (!message) return null;
      
      const lowerMsg = message.toLowerCase().trim();
      
      // 檢測命令
      if (lowerMsg === "/help" || lowerMsg === "help") {
        return { type: "HELP" };
      }
      
      if (lowerMsg === "/joke" || lowerMsg === "joke") {
        return { type: "JOKE" };
      }
      
      if (lowerMsg === "/cat" || lowerMsg === "cat") {
        return { type: "CAT" };
      }
      
      if (lowerMsg === "/dog" || lowerMsg === "dog") {
        return { type: "DOG" };
      }
      
      // 不是命令
      return null;
    }
  };