import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'About Us - VMR Solution | Plastic Household Products Manufacturer',
  description:
    'Learn about VMR Solution — a Ghaziabad-based manufacturer of durable, affordable plastic household products trusted by thousands of Indian homes.',
};

const stats = [
  { label: 'Years in Business', value: '10+' },
  { label: 'Products in Range', value: '500+' },
  { label: 'Happy Customers', value: '50,000+' },
  { label: 'Cities Delivered', value: '100+' },
];

const values = [
  {
    icon: 'ShieldCheckIcon',
    title: 'Uncompromised Quality',
    desc: 'Every product is manufactured with food-grade, BPA-free plastic and passes strict quality checks before leaving our factory.',
  },
  {
    icon: 'CurrencyRupeeIcon',
    title: 'Factory-Direct Pricing',
    desc: 'We manufacture everything in-house at our Ghaziabad unit, so you get the best price with no middlemen.',
  },
  {
    icon: 'SparklesIcon',
    title: 'Modern Design',
    desc: 'Our products blend functionality with aesthetics — vibrant colours, ergonomic shapes, and finishes that suit every home.',
  },
  {
    icon: 'BuildingStorefrontIcon',
    title: 'Bulk & Wholesale',
    desc: 'We supply retailers, wholesalers, and institutions across India with custom pricing and dedicated account support.',
  },
];

const timeline = [
  {
    year: '2014',
    title: 'Founded',
    desc: 'VMR Solution was established in Ghaziabad with a small manufacturing unit and a vision to make quality plastic products accessible to every household.',
  },
  {
    year: '2017',
    title: 'Expanded Product Range',
    desc: 'Grew from basic buckets and mugs to a full catalogue of 200+ household products including flower pots, containers, and storage solutions.',
  },
  {
    year: '2020',
    title: 'Pan-India Distribution',
    desc: 'Partnered with logistics networks to deliver across 100+ cities, making VMR products available nationwide.',
  },
  {
    year: '2024',
    title: 'Online Store Launch',
    desc: 'Launched our e-commerce platform to serve customers directly, offering the full product range with doorstep delivery.',
  },
];

const categories = [
  { name: 'Flower Pots', icon: 'HomeIcon' },
  { name: 'Plastic Mugs', icon: 'BeakerIcon' },
  { name: 'Airtight Containers', icon: 'ArchiveBoxIcon' },
  { name: 'Heavy Duty Buckets', icon: 'CubeIcon' },
  { name: 'Dustbins', icon: 'TrashIcon' },
  { name: 'Storage Boxes', icon: 'InboxStackIcon' },
  { name: 'Water Cans', icon: 'BeakerIcon' },
  { name: 'Bathroom Accessories', icon: 'SparklesIcon' },
];

export default function AboutPage() {
  return (
    <div className="bg-background">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <img
              src="/assets/images/logo.png"
              alt="VMR Solution"
              width={56}
              height={56}
              className="rounded-xl shadow-md"
            />
            <span className="font-heading text-3xl font-bold text-foreground">VMR Solution</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Our Story
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From a small factory in Ghaziabad to thousands of homes across India — we've been
            crafting durable, affordable plastic household products since 2014.
          </p>
          <p className="mt-3 text-base font-semibold text-primary">
            "Quality Plastic Products for Modern Living"
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-4xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Who We Are
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              VMR Solution is a Ghaziabad-based manufacturer specialising in plastic housemould
              products. Our state-of-the-art manufacturing unit at Murad Nagar Industrial Area
              produces everything from everyday mugs and buckets to decorative flower pots and
              airtight food containers.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We are an MSME-registered, GST-compliant unit committed to sustainable manufacturing
              practices. Our products are made from high-quality, food-safe plastic that is built to
              last — giving you real value for money.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you're a homemaker looking for reliable kitchen storage, a gardening enthusiast
              seeking stylish pots, or a business placing a bulk order — VMR Solution has you covered.
            </p>
          </div>

          {/* Company Details Panel */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">Company Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Founded</p>
                <p className="font-semibold text-foreground">2014</p>
              </div>
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="font-semibold text-foreground">MSME Manufacturer</p>
              </div>
              <div>
                <p className="text-muted-foreground">Industry</p>
                <p className="font-semibold text-foreground">Plastic Housemould Products</p>
              </div>
              <div>
                <p className="text-muted-foreground">Compliance</p>
                <p className="font-semibold text-foreground">GST Registered</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">Ghaziabad, UP – 201206</p>
              </div>
              <div>
                <p className="text-muted-foreground">Delivery</p>
                <p className="font-semibold text-foreground">Pan-India</p>
              </div>
              <div>
                <p className="text-muted-foreground">Material</p>
                <p className="font-semibold text-foreground">Food-Grade, BPA-Free Plastic</p>
              </div>
              <div>
                <p className="text-muted-foreground">Orders</p>
                <p className="font-semibold text-foreground">Retail &amp; Bulk</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]"
              >
                <Icon name="PhoneIcon" size={15} />
                Get in Touch
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
              >
                <Icon name="ShoppingBagIcon" size={15} />
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              What We Stand For
            </h2>
            <p className="mt-2 text-muted-foreground">The principles that drive everything we make.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-card p-6 shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon name={v.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey / Timeline */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Our Journey</h2>
          <p className="mt-2 text-muted-foreground">A decade of growth, one product at a time.</p>
        </div>
        <div className="relative space-y-8 before:absolute before:left-5 before:top-2 before:h-full before:w-0.5 before:bg-border sm:before:left-[calc(50%-1px)]">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">{item.year}</span>
                  <h3 className="mt-1 font-semibold text-card-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              {/* Dot */}
              <div className="absolute left-3.5 top-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background sm:left-[calc(50%-8px)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Range */}
      <div className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              What We Make
            </h2>
            <p className="mt-2 text-muted-foreground">
              500+ products across 8 categories — all manufactured at our Ghaziabad facility.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/products"
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-elevation-1 transition-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-elevation-2"
              >
                <Icon name={cat.icon as any} size={18} className="flex-shrink-0" />
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-smooth hover:scale-[0.97]"
            >
              <Icon name="ShoppingBagIcon" size={18} />
              Browse Full Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-primary/80 py-12 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
            Partner With Us
          </h2>
          <p className="mt-3 text-primary-foreground/80 leading-relaxed">
            Looking for bulk orders, wholesale pricing, or custom products? We work with retailers,
            distributors, and institutions across India.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-smooth hover:scale-[0.97]"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="rounded-md border border-white px-6 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-white/10"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
