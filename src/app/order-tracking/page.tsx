import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import OrderTrackingInteractive from './components/OrderTrackingInteractive';

export const metadata: Metadata = {
  title: 'Order Tracking - VMR Solution',
  description: 'Track your VMR Solution order delivery status in real-time with detailed timeline, location updates, and estimated delivery information for plastic household products across India.',
};

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <Breadcrumb />
        
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Track Your Order
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Monitor your order delivery progress and get real-time updates on your shipment
          </p>
        </div>

        <OrderTrackingInteractive />
      </main>

      <footer className="mt-16 border-t border-border bg-card">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-foreground">
                Customer Service
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-foreground">
                About VMR Solution
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Quality Assurance
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Bulk Orders
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-smooth hover:text-primary">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-foreground">
                Contact Information
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@vmrsolution.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Hours: Mon-Sat, 9 AM - 6 PM</li>
                <li>Address: Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="caption text-muted-foreground">
              © {new Date().getFullYear()} VMR Solution. All rights reserved. | Made in India 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



