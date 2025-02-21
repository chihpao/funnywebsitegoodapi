const axios = require('axios');

module.exports = async (req, res) => {
  // 設置 CORS 標頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
      timeout: 5000, // 設置超時時間
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.data || !response.data.setup || !response.data.punchline) {
      throw new Error('Invalid joke format received');
    }

    console.log('Joke API response:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch joke',
      details: error.message 
    });
  }
};