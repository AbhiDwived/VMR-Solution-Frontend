import type { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata: Metadata = {
  title: 'Premium Plastic Flower Pot - Durable Garden Planter - VMR Solution',
  description: 'High-quality plastic flower pot available in multiple sizes and colors. Perfect for indoor and outdoor gardening with UV protection, drainage system, and bulk pricing options for wholesalers.',
};

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <Breadcrumb />
        <ProductDetailsInteractive />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
                About VMR Solution
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your trusted source for high-quality plastic household and utility products across India.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Bulk Orders</li>
                <li>Track Order</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
                Customer Service
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Shipping Policy</li>
                <li>Return Policy</li>
                <li>Warranty Info</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@vmrsolution.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Hours: Mon-Sat, 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="caption text-muted-foreground">
              &copy; {new Date().getFullYear()} VMR Solution. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
