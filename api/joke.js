const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // 設置 CORS 標頭
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 處理 OPTIONS 請求
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Vercel Serverless Function'
      }
    });
    
    // 確保回應資料格式正確
    const joke = response.data;
    if (!joke || typeof joke.setup !== 'string' || typeof joke.punchline !== 'string') {
      throw new Error('Invalid joke format received');
    }

    // 記錄成功回應
    console.log('Successfully fetched joke:', JSON.stringify(joke));
    return res.status(200).json(joke);

  } catch (error) {
    // 詳細的錯誤記錄
    console.error('Full error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });

    return res.status(500).json({
      error: 'Failed to fetch joke',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
};