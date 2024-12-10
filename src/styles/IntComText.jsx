// FILE: styles.jsx
import { css } from '@emotion/react';

export const moveAnimation = css`
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
`;