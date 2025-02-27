export default async function handler(req, res) {
    // CORS 設定
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
        // 獲取用戶訊息
        const userMessage = req.body.message;
        
        // 返回測試回應 - 不調用任何 API
        return res.status(200).json({
          reply: `您說: "${userMessage}" (這是測試回應，不調用 API)`
        });
      } catch (error) {
        console.error("API 錯誤:", error);
        return res.status(500).json({
          reply: "處理請求時發生錯誤",
          error: error.message
        });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }