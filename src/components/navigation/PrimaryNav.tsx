'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface MenuState {
  isMobileMenuOpen: boolean;
  isCustomerDropdownOpen: boolean;
  isUserDropdownOpen: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Admin', href: '/admin' },
  { label: 'News', href: '/news' },
  { label: 'Community', href: '/community' },
  { label: 'Help', href: '/help' },
];

export default function PrimaryNav() {
  const [menuState, setMenuState] = useState<MenuState>({
    isMobileMenuOpen: false,
    isCustomerDropdownOpen: false,
    isUserDropdownOpen: false,
  });

  const toggleMenu = (menuKey: keyof MenuState) => {
    setMenuState(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
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
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[var(--components-text-primary)] hover:text-[var(--primary-main)] px-0 py-2 text-[var(--fontsize-body-md)] font-[var(--fontweight-medium)] font-[var(--fontfamily-primary)] tracking-[var(--letterspacing-normal)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">

            <button
              onClick={() => toggleMenu('isUserDropdownOpen')}
              className="text-[var(--primary-main)] hover:text-[var(--primary-light)] px-[5px] py-1 text-[var(--fontsize-body-xs)] font-[var(--fontweight-medium)] flex items-center rounded-[5px]"
            >
              <span className="font-[var(--fontfamily-primary)] tracking-[var(--letterspacing-wide)]">User Name</span>
              <svg
                className={`ml-2 h-4 w-4 transform ${
                  menuState.isUserDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-[var(--fontsize-body-md)] font-[var(--fontweight-medium)] text-[var(--components-text-primary)] hover:text-[var(--primary-main)] hover:bg-[var(--components-background-contrast-sm)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[var(--components-divider-main)]">
            <div className="px-2 space-y-1">
              <button
                onClick={() => toggleMenu('isCustomerDropdownOpen')}
                className="block w-full text-left px-3 py-2 rounded-md text-[var(--fontsize-body-md)] font-[var(--fontweight-medium)] text-[var(--components-text-primary)] hover:text-[var(--primary-main)] hover:bg-[var(--components-background-contrast-sm)]"
              >
                Customer
              </button>
              <button
                onClick={() => toggleMenu('isUserDropdownOpen')}
                className="block w-full text-left px-3 py-2 rounded-md text-[var(--fontsize-body-md)] font-[var(--fontweight-medium)] text-[var(--primary-main)] hover:text-[var(--primary-light)] hover:bg-[var(--components-background-contrast-sm)]"
              >
                User Name
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 