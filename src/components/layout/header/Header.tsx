'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const Header = () => {
  const pathname = usePathname();

  const navigationLinks = [
    { label: 'Home', path: '/', icon: 'HomeIcon' },
    { label: 'Shop', path: '/shop', icon: 'ShoppingBagIcon' },
    { label: 'Products', path: '/product-catalog', icon: 'ShoppingBagIcon' },
    { label: 'Categories', path: '/categories', icon: 'TagIcon' },
    { label: 'About Us', path: '/about', icon: 'InformationCircleIcon' },
    { label: 'Contact Us', path: '/contact', icon: 'PhoneIcon' },
    { label: 'Bulk Orders', path: '/bulk-orders', icon: 'TruckIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  return (
    <div className="w-full bg-card border-b border-border">
      <nav className="w-full">
        <div className="flex items-center justify-center space-x-1 py-2 px-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center space-x-1 sm:space-x-2 rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-smooth hover:bg-muted whitespace-nowrap ${
                isActivePath(link.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground'
              }`}
            >
              <Icon name={link.icon as any} size={16} className="sm:size-5" />
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;