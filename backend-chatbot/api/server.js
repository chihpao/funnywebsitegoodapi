/**
 * Gemini 聊天機器人後端服務
 * 提供 API 端點與 Google Gemini AI 進行互動，以及其他有趣的 API 服務
 */

// 引入必要的套件
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // 載入環境變數
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Google Gemini AI SDK
const axios = require('axios'); // HTTP 請求工具

// 初始化 Express 應用
const app = express();
const port = process.env.PORT || 10000;

// 環境變數驗證
if (!process.env.GEMINI_API_KEY) {
  console.error('錯誤: 缺少 GEMINI_API_KEY 環境變數');
  console.error('請在 .env 檔案中設置 GEMINI_API_KEY');
  process.exit(1);
}

/**
 * 中間件配置
 */
// 啟用壓縮，減少傳輸大小
const compression = require('compression');
app.use(compression());

// 設定快取控制，提高回應速度
const cacheControl = require('express-cache-controller');
app.use(cacheControl({
  maxAge: 300 // 5分鐘快取時間
}));

// 啟用 CORS，解決跨域請求問題
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // 優先使用環境變數中設定的前端網址，如果未設置則允許所有來源
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 啟用 JSON 請求解析，並限制請求大小以防止濫用
app.use(express.json({ limit: '1mb' }));

/**
 * Google Gemini AI 配置
 */
// 初始化 Google Generative AI 客戶端
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// 選擇 Gemini 模型 (gemini-1.5-flash 適合快速回應的場景)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * 使用 Google Gemini API 生成回應的函數
 * @param {string} userMessage - 使用者輸入的訊息
 * @returns {Promise<string>} - Gemini AI 的回應文字
 * @throws {Error} - 如果 API 調用失敗
 */
async function generateGeminiResponse(userMessage) {
  try {
    // 呼叫 Gemini API 生成內容
    const result = await model.generateContent(userMessage);
    // 提取回應文字
    const responseText = result.response.text();
    console.log("Gemini API 回應:", responseText);
    return responseText;
  } catch (error) {
    console.error("Gemini API 錯誤:", error);
    throw error; // 將錯誤向上傳遞，由調用者處理
  }
}

// ===== API 端點 =====

// 統一的 API 錯誤處理函數
const handleApiError = (res, error, defaultMessage, statusCode = 500) => {
  console.error('API 錯誤:', error);
  res.status(statusCode).json({ 
    error: defaultMessage, 
    details: error.message,
    timestamp: new Date().toISOString()
  });
};

// 1. 聊天機器人 API
app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;
  console.log("收到前端聊天訊息:", userMessage);
  
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return res.status(400).json({ 
      reply: "請提供有效的訊息內容",
      timestamp: new Date().toISOString()
    });
  }

  try {
    const aiResponse = await generateGeminiResponse(userMessage.trim());
    res.json({ 
      reply: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleApiError(res, error, "與 AI 服務通訊時發生錯誤，請稍後再試。");
  }
});

// 2. 笑話 API
app.get('/api/joke', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
      timeout: 5000 // 5秒超時
    });
    console.log('笑話 API 回應成功');
    res.json(response.data);
  } catch (error) {
    handleApiError(res, error, '無法取得笑話');
  }
});

// 3. 迷因 API
app.get('/api/memes', async (req, res) => {
  try {
    const response = await axios.get('https://memes.tw/wtf/api', {
      timeout: 5000 // 5秒超時
    });
    console.log('迷因 API 回應成功');
    res.json(response.data);
  } catch (error) {
    handleApiError(res, error, '無法取得迷因');
  }
});

// 4. 貓咪 API
app.get('/api/cats', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
      timeout: 5000 // 5秒超時
    });
    console.log('貓咪 API 回應成功');
    res.json(response.data);
  } catch (error) {
    handleApiError(res, error, '無法取得貓咪圖片');
  }
});

// 5. 狗狗 API
app.get('/api/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10', {
      timeout: 5000 // 5秒超時
    });
    console.log('狗狗 API 回應成功');
    res.json(response.data);
  } catch (error) {
    handleApiError(res, error, '無法取得狗狗圖片');
  }
});

// 6. 根路徑 - API 狀態檢查
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=60'); // 1分鐘快取
  res.send('TaTa API 服務運行中 - 包含 Chatbot、笑話、迷因、貓咪和狗狗 API!');
});

// 7. 健康檢查端點 - Vercel 用於監控服務
app.get('/health', (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); // 不快取健康檢查
  res.status(200).json({ status: 'ok', message: 'API 服務正常運行中' });
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error('全域錯誤處理:', err);
  res.status(500).json({ error: '伺服器錯誤', details: err.message });
});

// 啟動服務器
app.listen(port, () => {
  console.log(`API 服務運行於 http://localhost:${port}`);
  console.log(`聊天機器人 API 端點: http://localhost:${port}/api/chatbot`);
  console.log(`笑話 API 端點: http://localhost:${port}/api/joke`);
  console.log(`迷因 API 端點: http://localhost:${port}/api/memes`);
  console.log(`貓咪 API 端點: http://localhost:${port}/api/cats`);
  console.log(`狗狗 API 端點: http://localhost:${port}/api/dogs`);
});