const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    console.log('Dog API response:', response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching dog images:', error);
    return res.status(500).json({ error: 'Failed to fetch joke' });
  }
};