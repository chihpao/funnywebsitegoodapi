/**
 * API 伺服器
 * 提供笑話、迷因、貓和狗的圖片 API
 */

// 導入必要套件
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// 初始化 Express 應用
const app = express();
const port = process.env.PORT || 3000;

// 啟用 CORS，避免跨域問題
app.use(cors());

/**
 * 笑話 API 端點
 * 從外部服務獲取隨機笑話
 */
app.get('/api/joke', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    console.log('Joke API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({ error: 'Failed to fetch joke', message: error.message });
  }
});

/**
 * 迷因 API 端點
 * 從台灣迷因網站獲取隨機迷因
 */
app.get('/api/memes', async (req, res) => {
  try {
    const response = await axios.get('https://memes.tw/wtf/api');
    console.log('Memes API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching memes:', error);
    res.status(500).json({ error: 'Failed to fetch memes', message: error.message });
  }
});

/**
 * 貓咪 API 端點
 * 從 The Cat API 獲取隨機貓咪圖片
 */
app.get('/api/cats', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
    console.log('Cat API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error);
    res.status(500).json({ error: 'Failed to fetch cat images', message: error.message });
  }
});

/**
 * 狗狗 API 端點
 * 從 Dog CEO API 獲取隨機狗狗圖片
 */
app.get('/api/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    console.log('Dog API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog images:', error);
    res.status(500).json({ error: 'Failed to fetch dog images', message: error.message });
  }
});

/**
 * 啟動伺服器
 */
app.listen(port, () => {
  console.log(`API 伺服器運行於端口 ${port}`);
  console.log(`可用端點: http://localhost:${port}/api/joke, /api/memes, /api/cats, /api/dogs`);
});