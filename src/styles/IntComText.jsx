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
        0%, 20% {
          transform: translateY(100%);
          opacity: 0;
        }
        40%, 60% {
          transform: translateY(0);
          opacity: 1;
        }
        80%, 100% {
          transform: translateY(-100%);
          opacity: 0;
        }
      }
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
      .highlight-blackbg {
        background-color: black;
      }                
      .highlight-content {
        position: absolute;
        transition: opacity 0.5s ease, transform 0.5s ease;
        opacity: 0;
        transform: translateY(100%);
      }

      .highlight-content.active {
        opacity: 1;
        transform: translateY(0);
      }

      .highlight-content.exiting {
        opacity: 0;
        transform: translateY(-100%);
      }
    `}
  />
);