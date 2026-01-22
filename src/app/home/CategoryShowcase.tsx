'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  alt: string;
  icon: string;
}

const CategoryShowcase = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Flower Pots',
      itemCount: 45,
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'Variety of ceramic and plastic flower pots with plants',
      icon: 'SparklesIcon',
    },
    {
      id: '2',
      name: 'Mugs',
      itemCount: 32,
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      alt: 'Colorful plastic mugs in different sizes',
      icon: 'CakeIcon',
    },
    {
      id: '3',
      name: 'Containers',
      itemCount: 67,
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Food storage containers with airtight lids',
      icon: 'ArchiveBoxIcon',
    },
    {
      id: '4',
      name: 'Buckets',
      itemCount: 28,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      alt: 'Heavy duty plastic buckets for household use',
      icon: 'BeakerIcon',
    },
    {
      id: '5',
      name: 'Dustbins',
      itemCount: 41,
      image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
      alt: 'Modern pedal dustbins with lids',
      icon: 'TrashIcon',
    },
  ];

  return (
    <section className="bg-muted/30 py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore our wide range of plastic household products
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/product-catalog?category=${category.name}`}
              className="group relative overflow-hidden rounded-lg bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-3"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <AppImage
                  src={category.image}
                  alt={category.alt}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-white">
                  <Icon name={category.icon as any} size={40} className="transition-smooth group-hover:scale-110" />
                  <h3 className="font-heading text-xl font-bold">{category.name}</h3>
                  <p className="caption">{category.itemCount} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;