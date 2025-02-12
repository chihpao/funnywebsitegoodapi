import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const navigation = [
  { name: 'InteractivePage', href: '/interactive', current: false },
  { name: 'API', href: '/API', current: false },
  {
    name: 'Find Random Fun',
    href: '/fun',
    current: false,
    subMenu: [
      { name: 'Find Memes', href: '/fun/memes' },
      { name: 'Find Cats', href: '/fun/cats' },
      { name: 'Find Dogs', href: '/fun/dogs' },
    ],
  },
  {
    name: 'Find Pao',
    href: '',
    current: false,
    subMenu: [
      { name: 'Pao @ Spotify', href: 'https://open.spotify.com/show/2gMSpNkgeKlE2Nyu8Ru4gw?si=17941dfb650a48eb&nd=1&dlsi=01d417b7b6bc4472' },
      { name: 'Pao @ Notion', href: 'https://chihpao.notion.site/' },
      { name: 'Pao @ Instagram', href: 'https://www.instagram.com/bobbie__moel' },
      { name: 'Pao @ Linkedin', href: 'https://www.linkedin.com/in/chihpao-chang-1745a423a/' },
      { name: 'Pao @ Facebook', href: 'https://www.facebook.com/chihpaoo/?locale=zh_TW' },
    ].map(item => ({ ...item, target: '_blank' })),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NavBarLink = ({ className, imgClassName, spanClassName, to }) => (
  <Link to={to} className={`flex items-center cursor-pointer ${className}`}>
    <img src="/NavBarCat01.png" alt="NavBarCat01" className={`w-auto ${imgClassName}`} />
    <span className={`text-2xl text-black ${spanClassName}`}>Stupid Cat</span>
  </Link>
);

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuStates, setMobileMenuStates] = useState({});
  const navigate = useNavigate();
  
  const toggleMobileSubmenu = (name, e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuStates(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(true);
      setActiveDropdown(name);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setActiveDropdown(null);
  };

  const handleNavigation = (path, isSubMenuItem = false, close = null, isExternalLink = false) => {
    if (isExternalLink) {
      window.open(path, '_blank');
    } else {
      navigate(path);
      if (isSubMenuItem) {
        close();
      }
    }
    closeDropdown();
  };

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
    <Disclosure as="nav" className="bg-white border-b border-gray-200 relative">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
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
              <div className="flex flex-1 items-center justify-start sm:justify-start">
                <NavBarLink className="" imgClassName="h-16 mr-2 hidden sm:block" spanClassName="hidden sm:block" to="/" />
              </div>
              <div className="hidden sm:flex sm:space-x-4">
                {navigation.map((item) => (
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
                        className={`absolute ${
                          item.name === 'Find Pao' ? 'right-0' : 'left-0'
                        } top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50`}
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
                                item.name === 'Find Pao'
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
                                if (item.name === 'Find Pao') {
                                  window.open(subItem.href, '_blank');
                                } else {
                                  handleNavigation(subItem.href, true, close);
                                }
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
                      onClick={() => handleNavigation(item.href, true, close)}
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
  );
}