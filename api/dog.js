import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    console.log('Dog API response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching dog images:', error);
    res.status(500).json({ error: 'Failed to fetch dog images' });
  }
}