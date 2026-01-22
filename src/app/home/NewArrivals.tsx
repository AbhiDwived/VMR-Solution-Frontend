'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface NewProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  launchDate: string;
}

const NewArrivals = () => {
  const products: NewProduct[] = [
    {
      id: '1',
      name: 'Eco-Friendly Biodegradable Containers',
      category: 'Containers',
      price: 899,
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Eco-friendly biodegradable food storage containers',
      launchDate: 'Jan 15, 2026',
    },
    {
      id: '2',
      name: 'Smart Sensor Dustbin',
      category: 'Dustbins',
      price: 1299,
      image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
      alt: 'Automatic sensor-based dustbin with touchless opening',
      launchDate: 'Jan 18, 2026',
    },
    {
      id: '3',
      name: 'Self-Watering Planter Pots',
      category: 'Flower Pots',
      price: 549,
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'Innovative self-watering planter pots for easy plant care',
      launchDate: 'Jan 20, 2026',
    },
  ];

  return (
    <section className="bg-secondary/5 py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <Icon name="SparklesIcon" size={32} className="text-secondary" variant="solid" />
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              New Arrivals
            </h2>
          </div>
          <p className="text-muted-foreground">
            Fresh additions to our collection
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product-details?id=${product.id}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
            >
              <div className="absolute left-2 top-2 z-10 rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                NEW
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="caption mb-1 text-muted-foreground">{product.category}</p>
                <h3 className="mb-2 text-lg font-medium text-card-foreground">
                  {product.name}
                </h3>
                <div className="mb-3 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="CalendarIcon" size={16} />
                  <span>Launched {product.launchDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="flex items-center space-x-1 text-sm font-medium text-secondary">
                    <span>View Details</span>
                    <Icon name="ArrowRightIcon" size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;