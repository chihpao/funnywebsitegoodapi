import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useLazyImage } from '../../hooks/useLazyImage';

/**
 * 懶載入圖片組件
 * @param {string} src - 圖片來源
 * @param {string} alt - 圖片替代文字
 * @param {string} className - CSS 類名
 * @param {string} placeholder - 佔位符圖片
 * @param {object} motionProps - Framer Motion 屬性
 * @param {function} onClick - 點擊事件處理函數
 */
function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '', 
  motionProps = {},
  onClick,
  ...props 
}) {
  const { imgSrc, isLoaded, isError, imgRef } = useLazyImage(src, placeholder);

  if (isError) {
    return (
      <div 
        ref={imgRef}
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        {...props}
      >
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">圖片載入失敗</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {/* 載入中的佔位符 */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}
      
      {/* 實際圖片 */}
      <motion.img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default memo(LazyImage);
