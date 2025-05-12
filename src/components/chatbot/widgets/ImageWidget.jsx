import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiAlertCircle, FiExternalLink } from 'react-icons/fi';

/**
 * 圖片小部件組件 - 用於在聊天機器人中顯示圖片
 * 包含加載狀態、錯誤處理和互動功能
 * 
 * @param {Object} props - 組件屬性
 * @returns {JSX.Element} 圖片小部件
 */
const ImageWidget = (props) => {
  // 解構屬性和狀態管理
  const { payload } = props;
  const [isLoading, setIsLoading] = useState(true);  // 加載狀態
  const [hasError, setHasError] = useState(false);   // 錯誤狀態
  const [isZoomed, setIsZoomed] = useState(false);   // 縮放狀態
  
  /**
   * 在組件掛載時檢查是否有有效的圖片來源
   */
  useEffect(() => {
    if (!payload || !payload.src) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [payload]);
  
  /**
   * 當沒有有效的圖片來源時顯示錯誤狀態
   */
  if (!payload || !payload.src) {
    return (
      <div className="chat-image-error">
        <FiAlertCircle className="error-icon" />
        <span>無法載入圖片</span>
      </div>
    );
  }
  
  /**
   * 切換圖片的縮放狀態
   */
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  /**
   * 在新標籤頁中打開圖片
   * @param {Event} e - 點擊事件
   */
  const openInNewTab = (e) => {
    e.stopPropagation();  // 阻止事件冒泡以避免觸發 toggleZoom
    window.open(payload.src, '_blank');
  };
  
  return (
    <div 
      className={`chat-image-container ${isZoomed ? 'zoomed' : ''}`} 
      onClick={toggleZoom}
      role="button"
      aria-label={payload.alt || "聊天圖片"}
    >
      {/* 加載中狀態顯示 */}
      {isLoading && (
        <div className="chat-image-loading">
          <div className="image-spinner"></div>
          <span>正在載入圖片...</span>
        </div>
      )}
      
      {/* 圖片元素 */}
      <img 
        src={payload.src} 
        alt={payload.alt || "聊天圖片"} 
        className={`chat-image ${hasError ? 'error' : ''} ${isLoading ? 'loading' : 'loaded'}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setHasError(true);
          e.target.onerror = null; // 避免錯誤迴圈
          e.target.src = "https://via.placeholder.com/300x200?text=圖片載入失敗";
        }}
      />
      
      {/* 圖片控制項 - 僅在成功加載圖片時顯示 */}
      {!isLoading && !hasError && (
        <div className="chat-image-controls">
          <button 
            className="image-control-btn" 
            onClick={openInNewTab} 
            title="在新標籤頁中打開"
            aria-label="在新標籤頁中打開圖片"
          >
            <FiExternalLink />
          </button>
          <span className="image-caption">{payload.caption || '點擊圖片可放大'}</span>
        </div>
      )}
    </div>
  );
};

/**
 * 屬性驗證
 */
ImageWidget.propTypes = {
  payload: PropTypes.shape({
    src: PropTypes.string.isRequired,  // 圖片來源URL（必需）
    alt: PropTypes.string,            // 圖片替代文字
    caption: PropTypes.string         // 圖片說明文字
  })
};

export default ImageWidget;