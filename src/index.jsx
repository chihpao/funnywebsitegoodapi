import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// 獲取根元素並設置類名以防止翻譯
const rootElement = document.getElementById('root');
rootElement.className = 'notranslate';

// 渲染應用程序到根元素
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
