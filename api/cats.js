import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    console.log('Cat API response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error);
    res.status(500).json({ error: 'Failed to fetch cat images' });
  }
}