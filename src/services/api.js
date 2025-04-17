/**
 * API 服務類 - 處理所有與後端 API 的通信
 * 提供一個統一的介面來與後端服務進行互動
 */
export class ApiService {
    /**
     * 取得 API URL，優先使用環境變量
     * 如果環境變量不存在，則使用預設的線上服務 URL
     * @param {string} endpoint - API 端點路徑
     * @returns {string} - 完整的 API URL
     */
    static getApiUrl(endpoint) {
      // 從環境變量取得基本 URL，或使用預設的線上服務 URL
      // 注意：確保這裡的備用 URL 指向您實際部署的後端 API 地址
      // 使用 Vercel 部署的後端 API 地址
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://backend-chatbot-psi.vercel.app';
      return `${baseUrl}${endpoint}`;
    }
  
    /**
     * 發送訊息到聊天機器人 API
     * 與 Gemini 聊天機器人進行互動
     * @param {string} message - 用戶訊息
     * @returns {Promise<Object>} - API 回應，包含機器人的回覆
     * @throws {Error} - 如果 API 調用失敗會拋出經過處理的錯誤
     */
    static async sendChatMessage(message) {
      try {
        console.log("準備發送請求到 Gemini 聊天機器人 API");
        
        // 發送 POST 請求到聊天機器人 API
        const response = await fetch(this.getApiUrl('/api/chatbot'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
  
        console.log("API 回應狀態碼:", response.status);
  
        // 檢查回應是否成功
        if (!response.ok) {
          // 嘗試解析錯誤回應中的詳細資訊
          const errorData = await response.json().catch(() => ({}));
          console.error("API 返回錯誤:", errorData);
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        // 解析成功的回應
        console.log("API 回應成功，正在解析資料");
        const data = await response.json();
        console.log("收到的回應資料:", data);
        return data;
      } catch (error) {
        // 記錄錯誤並轉換為友善的錯誤訊息
        console.error("Gemini API 調用失敗:", error);
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
     * 將各種技術錯誤轉換為友善的使用者錯誤訊息
     * @param {Error} error - 原始錯誤對象
     * @returns {Error} - 增強的錯誤對象，包含錯誤代碼和友善的訊息
     */
    static handleApiError(error) {
      // 根據錯誤類型分類處理
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        // 網路連接問題
        const networkError = new Error("網路連接問題，無法連接到 AI 服務。請檢查您的網路連接。");
        networkError.code = "NETWORK_ERROR";
        return networkError;
      } else if (error.message.includes("timeout") || error.message.includes("Timeout")) {
        // 請求超時
        const timeoutError = new Error("請求超時，伺服器回應時間過長。請稍後再試。");
        timeoutError.code = "TIMEOUT_ERROR";
        return timeoutError;
      } else if (error.message.includes("API 密鑰") || error.message.includes("API key")) {
        // API 密鑰問題
        const authError = new Error("AI 服務認證問題，可能是 API 密鑰無效或配置錯誤。請聯繫管理員。");
        authError.code = "AUTH_ERROR";
        return authError;
      } else {
        // 一般錯誤處理
        const generalError = new Error(error.message || "與 AI 服務通訊時發生未知錯誤。請稍後再試。");
        generalError.code = "GENERAL_ERROR";
        generalError.originalError = error; // 保存原始錯誤以便進一步調試
        return generalError;
      }
    }
  }