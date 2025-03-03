export default function handler(req, res) {
    // 設置 CORS 頭
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
    // 處理預檢請求
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // 檢查是否為 POST 請求
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    // 處理實際的 POST 請求
    try {
      const userMessage = req.body.message || 'No message provided';
      
      // 簡單測試回應
      return res.status(200).json({ 
        reply: `您說: "${userMessage}" (這是來自 Next.js API 路由的測試回應)` 
      });
    } catch (error) {
      console.error('錯誤:', error);
      return res.status(500).json({ 
        reply: '處理請求時發生錯誤',
        error: error.message 
      });
    }
  }