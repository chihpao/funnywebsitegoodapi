import React from 'react';
import PropTypes from 'prop-types';

/**
 * 圖片小部件組件 - 用於在聊天機器人中顯示圖片
 * @param {Object} props - 組件屬性
 * @returns {JSX.Element} 圖片小部件
 */
const ImageWidget = (props) => {
  const { payload } = props;
  
  if (!payload || !payload.src) {
    return <div className="chat-image-error">無法載入圖片</div>;
  }
  
  return (
    <div className="chat-image-container">
      <img 
        src={payload.src} 
        alt={payload.alt || "聊天圖片"} 
        className="chat-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=圖片載入失敗";
        }}
      />
    </div>
  );
};

ImageWidget.propTypes = {
  payload: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  })
};

export default ImageWidget;