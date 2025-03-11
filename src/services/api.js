/**
 * API 服務類 - 處理所有與後端 API 的通信
 */
export class ApiService {
    /**
     * 取得 API URL，優先使用環境變量
     * @param {string} endpoint - API 端點路徑
     * @returns {string} - 完整的 API URL
     */
    static getApiUrl(endpoint) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://funnywebsitegoodapi.onrender.com';
      return `${baseUrl}${endpoint}`;
    }
  
    /**
     * 發送訊息到聊天機器人 API
     * @param {string} message - 用戶訊息
     * @returns {Promise<Object>} - API 回應
     * @throws {Error} - 如果 API 調用失敗
     */
    static async sendChatMessage(message) {
      try {
        console.log("準備發送 API 請求到聊天機器人");
        
        const response = await fetch(this.getApiUrl('/api/chatbot'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
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
      } catch (error) {
        console.error("API 調用失敗:", error);
        throw this.handleApiError(error);
      }
    }
  
    /**
     * 獲取隨機笑話
     * @returns {Promise<Object>} - 笑話資料
     */
    static async getRandomJoke() {
      const response = await fetch(this.getApiUrl('/api/joke'));
      
      if (!response.ok) {
        throw this.handleApiError(new Error(`HTTP error! status: ${response.status}`));
      }
      
      return await response.json();
    }
  
    /**
     * 獲取隨機迷因
     * @returns {Promise<Object>} - 迷因資料
     */
    static async getRandomMeme() {
      const response = await fetch(this.getApiUrl('/api/memes'));
      
      if (!response.ok) {
        throw this.handleApiError(new Error(`HTTP error! status: ${response.status}`));
      }
      
      return await response.json();
    }
  
    /**
     * 獲取隨機貓咪圖片
     * @returns {Promise<Array>} - 貓咪圖片資料
     */
    static async getRandomCats() {
      const response = await fetch(this.getApiUrl('/api/cats'));
      
      if (!response.ok) {
        throw this.handleApiError(new Error(`HTTP error! status: ${response.status}`));
      }
      
      return await response.json();
    }
  
    /**
     * 獲取隨機狗狗圖片
     * @returns {Promise<Object>} - 狗狗圖片資料
     */
    static async getRandomDogs() {
      const response = await fetch(this.getApiUrl('/api/dogs'));
      
      if (!response.ok) {
        throw this.handleApiError(new Error(`HTTP error! status: ${response.status}`));
      }
      
      return await response.json();
    }
  
    /**
     * 處理 API 錯誤
     * @param {Error} error - 原始錯誤
     * @returns {Error} - 增強的錯誤對象
     */
    static handleApiError(error) {
      // 根據錯誤類型分類處理
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        const networkError = new Error("網路連接問題，無法連接到 AI 服務。");
        networkError.code = "NETWORK_ERROR";
        return networkError;
      } else if (error.message.includes("timeout") || error.message.includes("Timeout")) {
        const timeoutError = new Error("請求超時，伺服器回應時間過長。");
        timeoutError.code = "TIMEOUT_ERROR";
        return timeoutError;
      } else if (error.message.includes("API 密鑰") || error.message.includes("API key")) {
        const authError = new Error("AI 服務配置問題，請聯繫管理員。");
        authError.code = "AUTH_ERROR";
        return authError;
      } else {
        // 一般錯誤處理
        const generalError = new Error(error.message || "與 AI 服務通訊時發生未知錯誤");
        generalError.code = "GENERAL_ERROR";
        generalError.originalError = error;
        return generalError;
      }
    }
  }