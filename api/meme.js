const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get('https://memes.tw/wtf/api');
    console.log('Meme API response:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching memes:', error);
    return res.status(500).json({ error: 'Failed to fetch joke' });
  }
};