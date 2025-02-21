import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://memes.tw/wtf/api');
    console.log('Memes API response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
}