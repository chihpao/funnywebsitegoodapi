// src/components/SkinnyFooter.jsx
import React from 'react';

const SkinnyFooter = () => {
  return (
    <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1', zIndex: 10 }}>
      <p>© 2024 小保. All rights reserved.</p>
    </footer>
  );
};

export default SkinnyFooter;