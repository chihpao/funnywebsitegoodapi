import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    console.log('Joke API response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
}