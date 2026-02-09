'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { config } from '@/config/env';

const navigationLinks = [
  { label: 'Home', path: '/', icon: 'HomeIcon' },
  { label: 'Products', path: '/products', icon: 'ShoppingBagIcon' },
];

const navigationLinksEnd = [
  { label: 'Blog', path: '/blog', icon: 'DocumentTextIcon' },
  { label: 'About Us', path: '/about', icon: 'InformationCircleIcon' },
  { label: 'Contact Us', path: '/contact', icon: 'PhoneIcon' },
];

const Header = memo(() => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${config.apiUrl}/categories`);
        const data = await res.json();
        const activeCategories = (data.categories || []).filter((c: any) => c.status === 'active');
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-card border-b border-border">
      <nav className="w-full">
        <div className="flex items-center justify-center space-x-1 py-2 px-1">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-1 sm:space-x-2 rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-muted whitespace-nowrap ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-foreground'
                }`}
              >
                <Icon name={link.icon as any} size={16} className="sm:size-5" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className="flex items-center space-x-1 sm:space-x-2 rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-muted whitespace-nowrap text-foreground"
            >
              <Icon name="TagIcon" size={16} className="sm:size-5" />
              <span className="hidden sm:inline">{category.name}</span>
            </Link>
          ))}
          {navigationLinksEnd.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-1 sm:space-x-2 rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors hover:bg-muted whitespace-nowrap ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-foreground'
                }`}
              >
                <Icon name={link.icon as any} size={16} className="sm:size-5" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;



