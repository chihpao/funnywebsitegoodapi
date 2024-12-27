// // src/components/DifyChat.jsx
// import React, { useState, useEffect } from 'react';

// function DifyChat() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const iframe = document.getElementById('dify-chat-iframe');
//     iframe.onload = () => {
//       setLoading(false);
//     };
//   }, []);

//   return (
//     <div style={styles.container}>
//       {loading && (
//         <div style={styles.loaderContainer}>
//           <div style={styles.loader}></div>
//         </div>
//       )}
//       <iframe
//         id="dify-chat-iframe"
//         src="https://udify.app/chatbot/foATm8XqjHtrXCqY"
//         style={loading ? styles.hiddenIframe : styles.iframe}
//         frameBorder="0"
//         allow="microphone">
//       </iframe>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     position: 'relative',
//     width: '100%',
//     height: 'calc(100vh - 100px)', // 確保不會蓋到 navbar 和 footer
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loaderContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     zIndex: 10,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   loader: {
//     border: '16px solid #f3f3f3',
//     borderRadius: '50%',
//     borderTop: '16px solid #3498db',
//     width: '120px',
//     height: '120px',
//     animation: 'spin 2s linear infinite',
//   },
//   iframe: {
//     width: '100%',
//     height: '100%',
//     display: 'block',
//   },
//   hiddenIframe: {
//     display: 'none',
//   },
//   '@keyframes spin': {
//     '0%': { transform: 'rotate(0deg)' },
//     '100%': { transform: 'rotate(360deg)' },
//   },
// };

// export default DifyChat;