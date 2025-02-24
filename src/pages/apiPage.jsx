import React from 'react';

export default function api() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">API 說明</h1>
      <p className="mb-4">
        下列 API 提供 JSON 格式的資料，您可以根據以下網址存取相關資源：
      </p>
      <ul className="list-disc pl-5">
        <li>隨機笑話: <a href="https://funnywebsitegoodapi.vercel.app/api/joke" className="text-blue-600" target="_blank" rel="noreferrer">https://funnywebsitegoodapi.vercel.app/api/joke</a></li>
        <li>搞笑梗圖: <a href="https://funnywebsitegoodapi.vercel.app/api/meme" className="text-blue-600" target="_blank" rel="noreferrer">https://funnywebsitegoodapi.vercel.app/api/meme</a></li>
        <li>貓咪圖片: <a href="https://funnywebsitegoodapi.vercel.app/api/cat" className="text-blue-600" target="_blank" rel="noreferrer">https://funnywebsitegoodapi.vercel.app/api/cat</a></li>
        <li>狗狗圖片: <a href="https://funnywebsitegoodapi.vercel.app/api/dog" className="text-blue-600" target="_blank" rel="noreferrer">https://funnywebsitegoodapi.vercel.app/api/dog</a></li>
      </ul>
      <p className="mt-4">
      </p>
    </div>
  );
}