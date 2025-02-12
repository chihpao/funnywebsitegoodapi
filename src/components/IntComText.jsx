import { Global, css } from '@emotion/react';

export const moveAnimation01 = (
  <Global
    styles={css`
      /* 移動動畫 */
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
      .animate-move {
        animation: move 3s infinite;
      }

      /* 高亮顯示區塊基本樣式 */
      .highlight-whitebg,
      .highlight-blackbg {
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
      .highlight-blackbg {
        background-color: black;
      }

      /* 使用新動畫類別，先定義基本位置 */
      .highlight-content {
        position: absolute;
      }
      /* 進入動畫：從下方往上進入 */
      .animate-in {
        animation: fadeIn 0.5s forwards;
      }
      /* 離開動畫：往上滑動消失 */
      .animate-out {
        animation: fadeOut 0.5s forwards;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-100%);
        }
      }

      /* 漸層動畫 */
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }

      /* 其他淡入動畫 (針對其他內容) */
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
      .animate-fade-in-up {
        animation: fade-in-up 4s ease-in-out infinite;
      }
    `}
  />
);