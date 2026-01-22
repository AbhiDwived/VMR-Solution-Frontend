'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/', icon: 'HomeIcon' },
    { label: 'Products', path: '/product-catalog', icon: 'ShoppingBagIcon' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCartIcon' },
    { label: 'Checkout', path: '/checkout-process', icon: 'CreditCardIcon' },
    { label: 'My Account', path: '/user-dashboard', icon: 'UserCircleIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-card shadow-elevation-2 transition-smooth">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <img
              src="/assets/images/logo.png"
              alt="VMR Solution Logo"
              width="40"
              height="40"
              className="transition-smooth"
            />
            <span className="font-heading text-xl font-semibold text-foreground">
              VMR Solution
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navigationItems.map((item, index) => (
              <Link
                key={`desktop-${item.path}`}
                href={item.path}
                className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-smooth hover:bg-muted ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section - Search, User Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted md:h-auto md:w-auto md:space-x-2 md:px-4"
              aria-label="Search products"
            >
              <Icon name="MagnifyingGlassIcon" size={20} />
              <span className="hidden md:inline">Search</span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted"
                aria-label="User menu"
              >
                <Icon name="UserCircleIcon" size={24} />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[150]"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-[200] mt-2 w-56 rounded-md bg-popover shadow-elevation-3 transition-smooth">
                    <div className="p-4">
                      <p className="text-sm font-medium text-popover-foreground">
                        Welcome, Guest
                      </p>
                      <p className="caption text-muted-foreground">
                        Sign in to access your account
                      </p>
                    </div>
                    <div className="border-t border-border">
                      <Link
                        href="/user-dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground transition-smooth hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="UserIcon" size={18} />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/order-tracking"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground transition-smooth hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="TruckIcon" size={18} />
                        <span>Track Orders</span>
                      </Link>
                    </div>
                    <div className="border-t border-border p-3">
                      <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]">
                        Sign In
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted md:hidden"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[250] bg-background md:hidden"
            onClick={closeMobileMenu}
          />
          <nav className="fixed left-0 top-16 z-[300] h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-card shadow-elevation-4 md:hidden">
            <div className="space-y-1 p-4">
              {navigationItems.map((item, index) => (
                <Link
                  key={`mobile-${item.path}`}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 rounded-md px-4 py-3 text-sm font-medium transition-smooth ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;