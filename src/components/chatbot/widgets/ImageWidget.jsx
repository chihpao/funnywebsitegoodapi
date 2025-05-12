import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiImage, FiAlertCircle, FiExternalLink } from 'react-icons/fi';

/**
 * 圖片小部件組件 - 用於在聊天機器人中顯示圖片
 * @param {Object} props - 組件屬性
 * @returns {JSX.Element} 圖片小部件
 */
const ImageWidget = (props) => {
  const { payload } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // 檢查是否有有效的圖片來源
  useEffect(() => {
    if (!payload || !payload.src) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [payload]);
  
  // 如果沒有有效的圖片來源
  if (!payload || !payload.src) {
    return (
      <div className="chat-image-error">
        <FiAlertCircle className="error-icon" />
        <span>無法載入圖片</span>
      </div>
    );
  }
  
  // 切換縮放狀態
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  // 在新標籤頁中打開圖片
  const openInNewTab = (e) => {
    e.stopPropagation();
    window.open(payload.src, '_blank');
  };
  
  return (
    <div className={`chat-image-container ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
      {isLoading && (
        <div className="chat-image-loading">
          <div className="image-spinner"></div>
          <span>正在載入圖片...</span>
        </div>
      )}
      
      <img 
        src={payload.src} 
        alt={payload.alt || "聊天圖片"} 
        className={`chat-image ${hasError ? 'error' : ''} ${isLoading ? 'loading' : 'loaded'}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setHasError(true);
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=圖片載入失敗";
        }}
      />
      
      {!isLoading && !hasError && (
        <div className="chat-image-controls">
          <button className="image-control-btn" onClick={openInNewTab} title="在新標籤頁中打開">
            <FiExternalLink />
          </button>
          <span className="image-caption">{payload.caption || '點擊圖片可放大'}</span>
        </div>
      )}
    </div>
  );
};

ImageWidget.propTypes = {
  payload: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    caption: PropTypes.string
  })
};

export default ImageWidget;