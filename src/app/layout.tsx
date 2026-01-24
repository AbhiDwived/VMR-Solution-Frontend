import React from 'react';
import type { Metadata, Viewport } from 'next';
import { StoreProvider } from '@/lib/providers/StoreProvider';
import '../styles/index.css';

const Header = React.lazy(() => import('@/components/common/Header'));
const Footer = React.lazy(() => import('@/components/common/Footer'));

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'VMR Solution - Quality Plastic Products',
  description: 'Premium plastic household products with fast delivery',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <React.Suspense fallback={<div className="h-16 bg-card border-b" />}>
            <Header />
          </React.Suspense>
          {children}
          <React.Suspense fallback={<div className="h-32 bg-muted" />}>
            <Footer />
          </React.Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}



