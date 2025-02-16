const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// 啟用 CORS，避免跨域問題
app.use(cors());

app.get('/api/joke', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    console.log('Joke API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

app.get('/api/memes', async (req, res) => {
  try {
    const response = await axios.get('https://memes.tw/wtf/api');
    console.log('Memes API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

app.get('/api/cats', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    console.log('Cat API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error);
    res.status(500).json({ error: 'Failed to fetch cat images' });
  }
});

app.get('/api/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    console.log('Dog API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog images:', error);
    res.status(500).json({ error: 'Failed to fetch dog images' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});