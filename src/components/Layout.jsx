import React from 'react';

/**
 * 統一布局組件
 * 提供全站一致的容器樣式和佈局基礎
 * @param {object} props - 組件屬性
 * @param {React.ReactNode} props.children - 子組件
 * @param {string} props.className - 可選的額外類名
 * @returns {JSX.Element} 佈局組件
 */
const Layout = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
