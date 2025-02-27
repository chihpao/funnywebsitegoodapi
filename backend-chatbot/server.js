const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai"); // 注意 GoogleGenerativeAI 是兩個大寫 "I"

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:5173', // 前端服務的 URL
  methods: ['GET', 'POST'],
  credentials: true
}));
// 啟用 CORS，允許跨域請求
app.use(bodyParser.json()); // 使用 body-parser 中介軟體解析 JSON 格式的請求體

// 初始化 Google Gemini API 客戶端
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBPziChz020y0o5S6afQMQYmt3roH6uOA8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 處理前端 chatbot 發送的 POST 請求，端點為 /api/chatbot
app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message; // 從請求體中獲取使用者訊息
  console.log("Received message from frontend:", userMessage);

  // 使用 Google Gemini API 獲取 AI 回覆
  try {
    const aiAgentResponse = await generateGeminiResponse(userMessage); // 調用 generateGeminiResponse 函數
    res.json({ reply: aiAgentResponse }); // 將 AI 代理人的回覆以 JSON 格式返回給前端
  } catch (error) {
    console.error("Gemini API 呼叫錯誤:", error);
    res.status(500).json({ reply: "與 AI 服務通訊時發生錯誤，請稍後再試。" }); // 返回錯誤訊息給前端
  }
});

// 使用 Google Gemini API 生成回應的函數
async function generateGeminiResponse(userMessage) {
  try {
    const result = await model.generateContent(userMessage); // 調用 Gemini Pro 模型的 generateContent 方法
    const responseText = result.response.text(); // 從 Gemini API 回應中提取文字回覆

    console.log("Gemini API response:", responseText); // 輸出 Gemini API 的原始回應 (除錯用)
    return responseText;
  } catch (error) {
    console.error("Gemini API 錯誤:", error);
    throw error; // 將錯誤拋出，讓上層的 try...catch 區塊處理
  }
}


// 處理根路徑 '/' 的 GET 請求 (用於測試伺服器是否啟動)
app.get('/', (req, res) => {
  res.send('Backend API server is running with Gemini API!'); // 修改測試訊息
});

app.listen(port, () => {
  console.log(`Backend API server listening at http://localhost:${port}`);
});