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
      const userMessage = req.body.message;
      console.log("收到用戶訊息:", userMessage);
      
      // 初始化 Google Gemini API 客戶端
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // 生成回應
      const result = await model.generateContent(userMessage);
      const responseText = result.response.text();
      console.log("Gemini API 回應:", responseText);
      
      res.status(200).json({ reply: responseText });
    } catch (error) {
      console.error("錯誤:", error);
      res.status(500).json({ reply: "與 AI 服務通訊時發生錯誤，請稍後再試。" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}