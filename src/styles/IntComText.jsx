// FILE: src/styles/IntComText.jsx
import { Global, css } from '@emotion/react';

export const moveAnimation01 = (
  <Global
    styles={css`
      @keyframes move {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(100px);
        }
        100% {
          transform: translateX(0);
        }
      }
      .animate-move {
        animation: move 3s infinite;
      }
      @keyframes slide-up {
        0%, 100% {
          transform: translateY(100%);
          opacity: 0;
        }
        20%, 40% {
          transform: translateY(0);
          opacity: 1;
        }
        60%, 80% {
          transform: translateY(-100%);
          opacity: 0;
        }
      }
      .highlight {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        padding: 12px 8px;
        background-color: transparent;
        overflow: hidden;
        height: 1em;
      }

      .highlight-content {
        animation: slide-up 2.5s ease-in-out infinite;
      }
    `}
  />
);