import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { moveAnimation } from '../styles/IntComText.jsx';


const InteractiveComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-4">
        <div
          dangerouslySetInnerHTML={{
            __html: `<lottie-player src="https://lottie.host/09c5791a-cce0-4f1a-9c4d-ae566c66f782/TdlWd2BQ6h.json" background="##FFFFFF" speed="1" style="width: 300px; height: 300px" loop autoplay></lottie-player>`,
          }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">阿嗚嗚</h1>
      <p className="text-lg text-center">待更待更...</p>
      <p className="text-lg text-center animate-move">這是一段會移動的文字</p>
      <Global styles={moveAnimation} />
    </div>
  );
};

export default InteractiveComponent;