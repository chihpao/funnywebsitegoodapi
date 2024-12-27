import { Global, css } from '@emotion/react';

// 定義全局樣式，包括動畫和一些樣式類別
export const moveAnimation01 = (
  <Global
    styles={css`
      /* 定義一個名為 move 的動畫，讓元素在 X 軸上輕微來回移動 */
      @keyframes move {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(30px);
        }
        100% {
          transform: translateX(0);
        }
      }

      /* 將 move 動畫應用到 .animate-move 類別 */
      .animate-move {
        animation: move 3s infinite;
      }

      /* 定義一個名為 slide-up 的動畫，讓元素從下往上滑動並逐漸顯示 */
      @keyframes slide-up {
        0%, 40% {
          transform: translateY(100%);
          opacity: 0;
        }
        60%, 100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      /* 定義高亮顯示的樣式，包括白色和黑色背景 */
      .highlight-whitebg, .highlight-blackbg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        padding: 12px 16px;
        background-color: transparent;
        overflow: hidden;
        height: 1em;
        width: 100px; /* 固定寬度 */
        position: relative;
      }

      /* 黑色背景的高亮顯示樣式 */
      .highlight-blackbg {
        background-color: black;
      }

      /* 高亮顯示內容的樣式，包含過渡效果 */
      .highlight-content {
        position: absolute;
        transition: opacity 0.5s ease, transform 0.5s ease;
        opacity: 0;
        transform: translateY(100%);
      }

      /* 當高亮顯示內容處於 active 狀態時的樣式 */
      .highlight-content.active {
        opacity: 1;
        transform: translateY(0);
      }

      /* 當高亮顯示內容處於 exiting 狀態時的樣式 */
      .highlight-content.exiting {
        opacity: 0;
        transform: translateY(-100%);
      }

      /* 高亮顯示內容的淡入效果 */
      .highlight-content.fade-in-up {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      /* 定義一個名為 gradient 的動畫，讓背景漸層來回移動 */
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* 將 gradient 動畫應用到 .animate-gradient 類別 */
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }

      /* 定義一個名為 fade-in-up 的動畫，讓元素從下往上淡入 */
      @keyframes fade-in-up {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        50% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-20px);
        }
      }

      /* 將 fade-in-up 動畫應用到 .animate-fade-in-up 類別 */
      .animate-fade-in-up {
        animation: fade-in-up 4s ease-in-out infinite;
      }
    `}
  />
);