import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// API 端點配置
const API_ENDPOINTS = [
  {
    name: '隨機笑話',
    endpoint: '/api/joke',
    description: '獲取一個隨機的搞笑笑話',
    icon: '😂'
  },
  {
    name: '搞笑梗圖',
    endpoint: '/api/memes',
    description: '獲取搞笑梗圖集合',
    icon: '🖼️'
  },
  {
    name: '貓咪圖片',
    endpoint: '/api/cats',
    description: '獲取可愛貓咪圖片',
    icon: '🐱'
  },
  {
    name: '狗狗圖片',
    endpoint: '/api/dogs',
    description: '獲取可愛狗狗圖片',
    icon: '🐶'
  }
];

// 動畫配置
const ANIMATIONS = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }
  },
  button: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  }
};

function ApiCard({ api, onTest }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`https://funnywebsitegoodapi.vercel.app${api.endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      setResponse(data);
      onTest?.(api.name, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, onTest]);

  const fullUrl = `https://funnywebsitegoodapi.vercel.app${api.endpoint}`;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      {...ANIMATIONS.card}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{api.icon}</span>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{api.name}</h3>
          <p className="text-gray-600 text-sm">{api.description}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API 端點:
        </label>
        <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm break-all">
          <a 
            href={fullUrl} 
            target="_blank" 
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {fullUrl}
          </a>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <motion.button
          onClick={handleTest}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          {...ANIMATIONS.button}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              測試中...
            </div>
          ) : (
            '🧪 測試 API'
          )}
        </motion.button>
        
        <motion.button
          onClick={() => navigator.clipboard.writeText(fullUrl)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          {...ANIMATIONS.button}
        >
          📋 複製
        </motion.button>
      </div>

      {/* 回應區域 */}
      {(response || error) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t pt-4"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API 回應:
          </label>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-600 font-medium">❌ 錯誤</div>
              <div className="text-red-700 text-sm mt-1">{error}</div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-green-600 font-medium mb-2">✅ 成功回應</div>
              <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ApiPage() {
  const [testHistory, setTestHistory] = useState([]);

  const handleApiTest = useCallback((apiName, response) => {
    setTestHistory(prev => [{
      id: Date.now(),
      apiName,
      response,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 4)]); // 保留最近 5 次測試記錄
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
      {...ANIMATIONS.container}
    >
      <div className="max-w-6xl mx-auto">
        {/* 標題區域 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚀 API 測試中心
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            歡迎使用我們的 API 服務！以下提供各種有趣的資料端點，
            您可以直接測試並查看回應結果。
          </p>
        </motion.div>

        {/* API 卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {API_ENDPOINTS.map((api, index) => (
            <motion.div
              key={api.endpoint}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ApiCard api={api} onTest={handleApiTest} />
            </motion.div>
          ))}
        </div>

        {/* 測試歷史記錄 */}
        {testHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 最近測試記錄</h2>
            <div className="space-y-3">
              {testHistory.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-800">{test.apiName}</span>
                    <span className="text-gray-500 text-sm ml-2">於 {test.timestamp}</span>
                  </div>
                  <span className="text-green-600 font-medium">✅ 成功</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 使用說明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 使用說明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">🔧 如何使用</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 點擊「測試 API」按鈕直接測試端點</li>
                <li>• 點擊「複製」按鈕複製 API 網址</li>
                <li>• 查看即時的 API 回應結果</li>
                <li>• 所有 API 都回傳 JSON 格式資料</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">⚡ 技術規格</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• HTTP GET 請求</li>
                <li>• JSON 回應格式</li>
                <li>• CORS 已啟用</li>
                <li>• 無需 API 金鑰</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}