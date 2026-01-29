'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set hydration state after component mounts
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="mx-auto w-full">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
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
            <span className="font-heading text-xl font-semibold text-foreground">VMR Solution</span>
          </Link>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md border border-border bg-background px-4 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* Login Link for Guests - Only show after hydration */}
            {isHydrated && !user && (
              <Link
                href="/auth/login"
                className="text-sm font-medium text-foreground hover:text-primary transition-smooth px-2"
              >
                Login
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href={isHydrated && user ? '/wishlist' : '/auth/login'}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted"
              aria-label="Wishlist"
            >
              <Icon name="HeartIcon" size={20} />
            </Link>

            {/* Cart */}
            <Link
              href={isHydrated && user ? '/shopping-cart' : '/auth/login'}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted"
              aria-label="Shopping cart"
            >
              <Icon name="ShoppingCartIcon" size={20} />
            </Link>

            {/* Mobile Search Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted md:hidden"
              aria-label="Search products"
            >
              <Icon name="MagnifyingGlassIcon" size={20} />
            </button>

            {/* User Menu - Only for Logged In Users */}
            {isHydrated && user && (
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
                          {`Hi, ${user.fullName.split(' ')[0]}`}
                        </p>
                        <p className="caption text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="border-t border-border">
                        <Link
                          href={user.role === 'admin' ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard'}
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
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full rounded-md bg-error text-white px-4 py-2 text-sm font-medium transition-smooth hover:scale-[0.97]"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

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
              <p className="text-sm text-muted-foreground px-4 py-2">Use navigation below</p>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
