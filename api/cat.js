const axios = require('axios');

module.exports = async (req, res) => {
  // 設定 CORS 標頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from Cat API');
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch cat images',
      message: error.message 
    });
  }
};