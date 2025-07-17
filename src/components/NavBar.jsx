import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * 導航選項配置
 * 定義應用程序的主要導航選項和子選單
 */
const navigation = [
  // 主要頁面選項
  { name: 'AI 智能助手', href: '/aiagent', current: false },
  { name: '互動頁面', href: '/interactive', current: false },
  // { name: 'API 文檔', href: '/api', current: false }, // 暂未啟用
  
  // 隨機樂趣功能選項 - 改為單一頁面
  {
    name: '隨機樂趣',
    href: '/fun',
    current: false,
  },
  
  // 作者社群媒體連結
  {
    name: '關於作者',
    href: '',
    current: false,
    subMenu: [
      { name: 'Pao @ Spotify', href: 'https://open.spotify.com/show/2gMSpNkgeKlE2Nyu8Ru4gw?si=17941dfb650a48eb&nd=1&dlsi=01d417b7b6bc4472' },
      { name: 'Pao @ Notion', href: 'https://chihpao.notion.site/' },
      { name: 'Pao @ Instagram', href: 'https://www.instagram.com/bobbie__moel' },
      { name: 'Pao @ Linkedin', href: 'https://www.linkedin.com/in/chihpao-chang-1745a423a/' },
      { name: 'Pao @ Facebook', href: 'https://www.facebook.com/chihpaoo/?locale=zh_TW' },
    ].map(item => ({ ...item, target: '_blank' })), // 設置外部連結在新標籤頁開啟
  },
];

/**
 * 合併 CSS 類名的實用函數
 * @param {...string} classes - 要合併的 CSS 類名
 * @returns {string} 合併後的類名字符串
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 導航欄標誌連結組件
 * 顯示導航欄左側的標誌和文字
 * @param {string} className - 容器的額外類名
 * @param {string} imgClassName - 圖片的額外類名
 * @param {string} spanClassName - 文字的額外類名
 * @param {string} to - 連結目標路徑
 * @returns {JSX.Element} 標誌連結組件
 */
const NavBarLink = ({ className, imgClassName, spanClassName, to }) => (
  <Link to={to} className={`flex items-center cursor-pointer ${className}`}>
    <img src="/NavBarCat01.png" alt="網站標誌" className={`w-auto ${imgClassName}`} />
    <span className={`text-2xl text-black ${spanClassName}`}>Stupid Cat</span>
  </Link>
);

export default function NavBar() {
  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    activeDropdown: null
  });
  const [mobileMenuStates, setMobileMenuStates] = useState({});
  const navigate = useNavigate();
  
  // 統一的下拉選單控制
  const toggleDropdown = (name) => {
    setDropdownState(prev => ({
      isOpen: prev.activeDropdown === name ? !prev.isOpen : true,
      activeDropdown: name
    }));
  };

  const closeDropdown = () => {
    setDropdownState({ isOpen: false, activeDropdown: null });
  };

  // 移動端子選單切換
  const toggleMobileSubmenu = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuStates(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  /**
   * 統一的導航處理函數
   * @param {string} path - 目標路徑或 URL
   * @param {Object} options - 導航選項
   */
  const handleNavigation = (path, options = {}) => {
    const { isExternal = false, closeMobileMenu = null } = options;
    
    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
      if (closeMobileMenu) {
        closeMobileMenu();
      }
    }
    closeDropdown();
  };

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="h-16"></div>
    <Disclosure as="nav" className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center">
              {/* 移動版選單按鈕 */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <NavBarLink className="ml-2" imgClassName="h-10" spanClassName="ml-2" to="/" />
              </div>
              
              {/* 左側 Logo */}
              <div className="flex items-center justify-start w-1/4">
                <NavBarLink className="" imgClassName="h-16 mr-2 hidden sm:block" spanClassName="hidden sm:block" to="/" />
              </div>
              
              {/* 中間導航項目 */}
              <div className="hidden sm:flex sm:space-x-4 sm:justify-center w-2/4">
                {navigation.filter(item => item.name !== '關於作者').map((item) => (
                  <div key={item.name} className="relative dropdown">
                    <button
                      onClick={item.subMenu ? () => toggleDropdown(item.name) : () => handleNavigation(item.href)}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-black',
                        'rounded-md px-3 py-2 text-lg font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                      {item.subMenu && <span className="ml-2"><i className="fas fa-chevron-down"></i></span>}
                    </button>
                    {item.subMenu && isDropdownOpen && activeDropdown === item.name && (
                      <div
                        className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50"
                      >
                        {item.subMenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            target={subItem.target}
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-black hover:bg-gray-200 hover:text-black"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(
                                subItem.href, 
                                true, 
                                close, 
                                false
                              );
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* 右側「關於作者」 */}
              <div className="hidden sm:flex sm:items-center sm:justify-end w-1/4 pr-4">
                {navigation.filter(item => item.name === '關於作者').map((item) => (
                  <div key={item.name} className="relative dropdown">
                    <button
                      onClick={item.subMenu ? () => toggleDropdown(item.name) : () => handleNavigation(item.href)}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-black',
                        'rounded-md px-3 py-2 text-lg font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                      {item.subMenu && <span className="ml-2"><i className="fas fa-chevron-down"></i></span>}
                    </button>
                    {item.subMenu && dropdownState.isOpen && dropdownState.activeDropdown === item.name && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {item.subMenu.map((subItem) => (
                          <button
                            key={subItem.name}
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleNavigation(subItem.href, { isExternal: true })}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.subMenu ? (
                    <>
                      <div
                        onClick={(e) => toggleMobileSubmenu(item.name, e)}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-black',
                          'block rounded-md px-3 py-2 text-lg font-medium cursor-pointer'
                        )}
                      >
                        {item.name}
                        <span className="ml-2">
                          <i className={`fas ${mobileMenuStates[item.name] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </span>
                      </div>
                      {mobileMenuStates[item.name] && (
                          <div className="pl-4">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              target={subItem.target}
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-black hover:bg-gray-200 hover:text-black"
                              onClick={(e) => {
                                e.preventDefault();
                                const isExternal = item.name === '關於作者';
                                handleNavigation(subItem.href, { 
                                  isExternal, 
                                  closeMobileMenu: close 
                                });
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-200 hover:text-black',
                        'block rounded-md px-3 py-2 text-lg font-medium'
                      )}
                      onClick={() => handleNavigation(item.href, { closeMobileMenu: close })}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </>
  );
}