const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    console.log('Cat API response:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error);
    return res.status(500).json({ error: 'Failed to fetch joke' });
  }
};