'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Icon, Icons } from '../Icon';
import { setTheme } from '../../app/theme/theme';
import UserMenu from '../menu/UserMenu';

interface NavItem {
  label: string;
  href?: string;
  action?: 'alert' | 'link';
  alertMessage?: string;
}

interface MenuState {
  isMobileMenuOpen: boolean;
  isCustomerDropdownOpen: boolean;
  isUserDropdownOpen: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', action: 'link' },
  { label: 'Admin', action: 'alert', alertMessage: 'Opens Admin page' },
  { label: 'News', action: 'alert', alertMessage: 'Opens release notes page' },
  { label: 'Community', action: 'alert', alertMessage: 'Opens Slack community login page' },
  { label: 'Help', action: 'alert', alertMessage: 'Opens docs page' },
];



export default function PrimaryNav() {
  const pathname = usePathname();
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const mobileUserButtonRef = useRef<HTMLButtonElement>(null);

  const [menuState, setMenuState] = useState<MenuState>({
    isMobileMenuOpen: false,
    isCustomerDropdownOpen: false,
    isUserDropdownOpen: false,
  });

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDark ? 'dark' : 'light');
  }, []);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuState.isUserDropdownOpen &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node) &&
        mobileUserButtonRef.current &&
        !mobileUserButtonRef.current.contains(event.target as Node)
      ) {
        setMenuState(prev => ({ ...prev, isUserDropdownOpen: false }));
      }
    };

    if (menuState.isUserDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuState.isUserDropdownOpen]);

  // Don't show the nav on the instructions editor page
  if (pathname.startsWith('/instructions-editor')) {
    return null;
  }

  const toggleMenu = (menuKey: keyof MenuState) => {
    setMenuState(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.action === 'alert' && item.alertMessage) {
      alert(item.alertMessage);
    }
  };

  const renderNavItem = (item: NavItem) => {
    const commonClasses = "px-0 py-2 text-body-sm text-_components-text-primary hover:text-[var(--primary-main)]";
    
    if (item.action === 'alert') {
      return (
        <button
          key={item.label}
          onClick={() => handleNavItemClick(item)}
          className={commonClasses}
        >
          {item.label}
        </button>
      );
    }
    
    return (
      <Link
        key={item.label}
        href={item.href || '#'}
        className={commonClasses}
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    const commonClasses = "block px-3 py-2 rounded-md text-_components-text-primary text-body-sm hover:text-[var(--primary-main)] hover:bg-[var(--components-background-contrast-sm)]";
    
    if (item.action === 'alert') {
      return (
        <button
          key={item.label}
          onClick={() => handleNavItemClick(item)}
          className={commonClasses}
        >
          {item.label}
        </button>
      );
    }
    
    return (
      <Link
        key={item.label}
        href={item.href || '#'}
        className={commonClasses}
      >
        {item.label}
      </Link>
    );
  };

  // Get the current anchor element based on screen size
  const getCurrentAnchorEl = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return mobileUserButtonRef.current;
    }
    return userButtonRef.current;
  };

  return (
    <nav className="w-full bg-[var(--components-background-default)] border-b border-[var(--components-divider-main)]">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/skillable-logo.svg"
                  className="block dark:hidden"
                  alt="Skillable Studio"
                  width={64}
                  height={32}
                  priority
                />
                <Image
                  src="/images/skillable-logo-white.svg"
                  className="hidden dark:block"
                  alt="Skillable Studio"
                  width={64}
                  height={32}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-10">
              <div className="flex space-x-6">
                {navItems.map(renderNavItem)}
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">

            <button
              ref={userButtonRef}
              onClick={() => toggleMenu('isUserDropdownOpen')}
              className="px-[5px] py-1 text-body-xs text-primary-main hover:text-[var(--primary-light)] flex items-center rounded-[5px]"
            >
              <span style={{
                fontFamily: 'var(--fontfamily-primary)',
                letterSpacing: 'var(--letterspacing-wide)'
              }}>Kim Oswalt</span>
              <Icon
                icon={Icons.chevronDown}
                className={`ml-2 h-4 w-4 transform ${
                  menuState.isUserDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => toggleMenu('isMobileMenuOpen')}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--components-text-primary)] hover:text-[var(--primary-main)] hover:bg-[var(--components-background-contrast-sm)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary-main)]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${menuState.isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${menuState.isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${menuState.isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(renderMobileNavItem)}
          </div>
          <div className="pt-4 pb-3 border-t border-[var(--components-divider-main)]">
            <div className="px-2 space-y-1">
              <button
                ref={mobileUserButtonRef}
                onClick={() => toggleMenu('isUserDropdownOpen')}
                className="w-full text-left px-3 py-2 text-body-sm text-primary-main rounded-md hover:text-[var(--primary-light)] hover:bg-[var(--components-background-contrast-sm)] flex items-center justify-between"
              >
                <span style={{
                  fontFamily: 'var(--fontfamily-primary)',
                  letterSpacing: 'var(--letterspacing-wide)'
                }}>Kim Oswalt</span>
                <Icon
                  icon={Icons.chevronDown}
                  className={`h-4 w-4 transform ${
                    menuState.isUserDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Menu */}
      <UserMenu
        isOpen={menuState.isUserDropdownOpen}
        onClose={() => toggleMenu('isUserDropdownOpen')}
        anchorEl={getCurrentAnchorEl()}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />
    </nav>
  );
} 