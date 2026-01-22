'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="var(--color-primary)" />
                <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20Z" fill="white" fillOpacity="0.2" />
                <path d="M16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20C22.2091 24 20 24C17.7909 24 16 22.2091 16 20Z" fill="white" />
                <text x="20" y="25" textAnchor="middle" fill="var(--color-primary)" fontSize="10" fontWeight="600" fontFamily="Crimson Pro, serif">PM</text>
              </svg>
              <span className="font-heading text-xl font-semibold text-foreground">VMR Solution</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your trusted partner for durable, affordable plastic household products.</p>
            <p className="text-sm font-medium text-primary mb-6">"Quality Plastic Products for Modern Living"</p>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:scale-[0.97] transition-smooth">Subscribe</button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">No spam, unsubscribe anytime</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-smooth">Home</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Shop</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Categories</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Flower Pots</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Plastic Mugs</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Containers</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Buckets</Link></li>
              <li><Link href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">Dustbins</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">FAQs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Shipping & Delivery</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Return Policy</Link></li>
              <li><Link href="/order-tracking" className="text-muted-foreground hover:text-primary transition-smooth">Order Tracking</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-smooth">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact & Follow</h4>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="flex items-center gap-2"><Icon name="PhoneIcon" size={16} />+91 98765 43210</p>
              <p className="flex items-center gap-2"><Icon name="EnvelopeIcon" size={16} />support@vmrsolution.in</p>
              <p className="flex items-center gap-2"><Icon name="ClockIcon" size={16} />Mon-Sat: 9 AM - 6 PM</p>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-smooth"><Icon name="ShareIcon" size={16} /></a>
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-smooth"><Icon name="CameraIcon" size={16} /></a>
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-smooth"><Icon name="ChatBubbleLeftRightIcon" size={16} /></a>
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-smooth"><Icon name="BuildingOfficeIcon" size={16} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VMR Solution. All Rights Reserved.</p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-muted-foreground">We Accept:</span>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-card border border-border rounded text-xs font-medium">VISA</div>
                <div className="px-2 py-1 bg-card border border-border rounded text-xs font-medium">MC</div>
                <div className="px-2 py-1 bg-card border border-border rounded text-xs font-medium">UPI</div>
                <div className="px-2 py-1 bg-card border border-border rounded text-xs font-medium">Paytm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;