// 語言: JavaScript (Node.js)
// 檔案位置: /server/api.js（你可以將此檔案放在 server 資料夾中）
const express = require('express');
const cors = require('cors');
const { fetchJoke, fetchMemes, fetchCatImages, fetchDogImages } = require('../src/API/FunApi.jsx');

const app = express();
app.use(cors());

// 取得隨機笑話
app.get('/api/joke', async (req, res) => {
  try {
    const joke = await fetchJoke();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: '無法取得笑話' });
  }
});

// 取得搞笑梗圖
app.get('/api/memes', async (req, res) => {
  try {
    const memes = await fetchMemes();
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: '無法取得梗圖' });
  }
});

// 取得貓咪圖片
app.get('/api/cats', async (req, res) => {
  try {
    const catImages = await fetchCatImages();
    res.json(catImages);
  } catch (error) {
    res.status(500).json({ error: '無法取得貓咪圖片' });
  }
});

// 取得狗狗圖片
app.get('/api/dogs', async (req, res) => {
  try {
    const dogImages = await fetchDogImages();
    res.json(dogImages);
  } catch (error) {
    res.status(500).json({ error: '無法取得狗狗圖片' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API 伺服器運作中，連接埠: ${port}`));