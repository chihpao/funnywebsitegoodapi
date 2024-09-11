import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemeComponent() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeme = () => {
    setLoading(true);
    setError(null);
    axios.get('https://memes.tw/wtf/api')
      .then(response => {
        console.log('API response:', response.data); // 添加日誌
        if (response.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          setMeme(response.data[randomIndex]); // 隨機選擇一個 meme
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching meme:', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  if (error) {
    return <div>Error loading meme: {error.message}</div>;
  }

  if (!meme) {
    return <div>No meme found</div>;
  }

  // 檢查數據的存在性
  const { title, src, author, pageview, total_like_count, created_at, hashtag, contest } = meme;
  const authorName = author ? author.name : 'Unknown';
  const createdAt = created_at ? created_at.date_time_string : 'Unknown';
  const contestName = contest ? contest.name : 'Unknown';
  console.log('Meme data:', { title, src, author, pageview, total_like_count, created_at, hashtag, contest }); // 添加日誌

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <button
        onClick={fetchMeme}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
      >
        Get Another Meme
      </button>
      <div className="relative w-full h-64 flex justify-center items-center">
        {loading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        ) : (
          <img src={src} alt={title} className="w-full h-full object-contain rounded-md" />
        )}
      </div>
    </div>
  );
}

export default MemeComponent;

{/* 
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <img src={src} alt={title} className="w-full rounded-md" />
      <p className="text-gray-700 mt-2">By: {authorName}</p>
      <p className="text-gray-700">Views: {pageview}</p>
      <p className="text-gray-700">Likes: {total_like_count}</p>
      <p className="text-gray-700">Created at: {createdAt}</p>
      <p className="text-gray-700">Hashtag: {hashtag}</p>
      <p className="text-gray-700">Category: {contestName}</p>
*/}
