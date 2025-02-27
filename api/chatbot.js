import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // 允許跨域請求
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // 安全地檢查 API 密鑰是否存在
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("API 密鑰未設置");
        return res.status(500).json({ reply: "伺服器配置錯誤: API 密鑰缺失" });
      }

      const userMessage = req.body.message;
      console.log("收到用戶訊息:", userMessage);
      
      // 初始化 Google Gemini API 客戶端
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // 生成回應
        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();
        console.log("Gemini API 回應成功");
        
        res.status(200).json({ reply: responseText });
      } catch (apiError) {
        console.error("Gemini API 呼叫失敗:", apiError);
        res.status(500).json({ 
          reply: "呼叫 AI 服務時發生錯誤",
          error: apiError.message // 只返回錯誤訊息，不要包含完整的堆疊跟踪
        });
      }
    } catch (error) {
      console.error("處理請求時發生錯誤:", error);
      res.status(500).json({ 
        reply: "伺服器處理請求時發生錯誤，請稍後再試。",
        error: error.message // 只返回錯誤訊息
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}