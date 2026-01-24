'use client';

import { useState, useEffect } from 'react';
import FilterPanel, { FilterState } from './FilterPanel';
import SortControls, { SortOption } from './SortControls';
import ProductGrid from './ProductGrid';
import MobileFilterPanel from './MobileFilterPanel';
import { Product } from './ProductCard';

const ProductCatalogInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sizes: [],
    colors: [],
    capacityRange: [0, 10000],
    priceRange: [0, 5000],
  });
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Ceramic Flower Pot with Drainage',
      category: 'Flower Pots',
      price: 299,
      originalPrice: 499,
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'White ceramic flower pot with green succulent plant on wooden table',
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['White', 'Black', 'Green'],
      capacity: '500ml',
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      isBestseller: true,
    },
    {
      id: '2',
      name: 'Colorful Plastic Mugs Set of 6',
      category: 'Mugs',
      price: 199,
      originalPrice: 299,
      image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
      alt: 'Set of six colorful plastic mugs in red, blue, yellow, green, orange and purple arranged on white surface',
      sizes: ['Medium'],
      colors: ['Red', 'Blue', 'Yellow', 'Green'],
      capacity: '300ml',
      inStock: true,
      rating: 4.2,
      reviewCount: 89,
      isBestseller: true,
    },
    {
      id: '3',
      name: 'Airtight Food Storage Container Set',
      category: 'Containers',
      price: 599,
      originalPrice: 899,
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Stack of transparent plastic food storage containers with blue lids on kitchen counter',
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['White'],
      capacity: '1000ml',
      inStock: true,
      rating: 4.7,
      reviewCount: 256,
      isNew: true,
    },
    {
      id: '4',
      name: 'Heavy Duty Plastic Bucket 20L',
      category: 'Buckets',
      price: 249,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      alt: 'Blue plastic bucket with metal handle on concrete floor',
      sizes: ['Large'],
      colors: ['Blue', 'Red', 'Green'],
      capacity: '20000ml',
      inStock: true,
      rating: 4.4,
      reviewCount: 167,
    },
    {
      id: '5',
      name: 'Modern Pedal Dustbin with Lid',
      category: 'Dustbins',
      price: 449,
      originalPrice: 699,
      image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
      alt: 'Stainless steel pedal dustbin with black lid in modern kitchen setting',
      sizes: ['Medium', 'Large'],
      colors: ['Black', 'White'],
      capacity: '10000ml',
      inStock: true,
      rating: 4.6,
      reviewCount: 203,
      isBestseller: true,
    },
    {
      id: '6',
      name: 'Decorative Garden Planter Pot',
      category: 'Flower Pots',
      price: 399,
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      alt: 'Terracotta colored decorative planter pot with flowering plant on garden patio',
      sizes: ['Medium', 'Large'],
      colors: ['Red', 'White', 'Black'],
      capacity: '800ml',
      inStock: true,
      rating: 4.3,
      reviewCount: 94,
      isNew: true,
    },
    {
      id: '7',
      name: 'Insulated Travel Mug with Lid',
      category: 'Mugs',
      price: 349,
      originalPrice: 499,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      alt: 'Black insulated travel mug with secure lid on car dashboard',
      sizes: ['Medium'],
      colors: ['Black', 'Blue', 'Red'],
      capacity: '400ml',
      inStock: true,
      rating: 4.8,
      reviewCount: 312,
      isBestseller: true,
    },
    {
      id: '8',
      name: 'Stackable Kitchen Storage Containers',
      category: 'Containers',
      price: 799,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/6489082/pexels-photo-6489082.jpeg',
      alt: 'Set of stackable clear plastic containers with green lids organized in kitchen pantry',
      sizes: ['Small', 'Medium'],
      colors: ['White'],
      capacity: '1500ml',
      inStock: true,
      rating: 4.5,
      reviewCount: 178,
    },
    {
      id: '9',
      name: 'Multi-Purpose Utility Bucket',
      category: 'Buckets',
      price: 179,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
      alt: 'Red plastic utility bucket with cleaning supplies on tiled floor',
      sizes: ['Medium', 'Large'],
      colors: ['Red', 'Blue', 'Yellow'],
      capacity: '15000ml',
      inStock: true,
      rating: 4.1,
      reviewCount: 67,
    },
    {
      id: '10',
      name: 'Touchless Sensor Dustbin',
      category: 'Dustbins',
      price: 1299,
      originalPrice: 1799,
      image: 'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg',
      alt: 'White touchless sensor dustbin with automatic lid in modern bathroom',
      sizes: ['Large'],
      colors: ['White', 'Black'],
      capacity: '12000ml',
      inStock: false,
      rating: 4.9,
      reviewCount: 421,
      isNew: true,
    },
    {
      id: '11',
      name: 'Hanging Flower Pot with Chain',
      category: 'Flower Pots',
      price: 249,
      image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg',
      alt: 'White hanging flower pot with metal chain and purple flowers on balcony',
      sizes: ['Small', 'Medium'],
      colors: ['White', 'Green', 'Yellow'],
      capacity: '600ml',
      inStock: true,
      rating: 4.4,
      reviewCount: 112,
    },
    {
      id: '12',
      name: 'Kids Cartoon Character Mugs',
      category: 'Mugs',
      price: 149,
      image: 'https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg',
      alt: 'Colorful plastic mugs with cartoon character designs for children on playroom table',
      sizes: ['Small'],
      colors: ['Red', 'Blue', 'Yellow'],
      capacity: '250ml',
      inStock: true,
      rating: 4.6,
      reviewCount: 234,
      isBestseller: true,
    },
  ];

  useEffect(() => {
    if (!isHydrated) return;

    let result = [...mockProducts];

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some((cat) =>
          p.category.toLowerCase().includes(cat.replace('-', ' '))
        )
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((color) => filters.colors.includes(color))
      );
    }

    result = result.filter((p) => {
      const capacity = parseInt(p.capacity);
      return capacity >= filters.capacityRange[0] && capacity <= filters.capacityRange[1];
    });

    result = result.filter((p) => {
      return p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
    });

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, sortBy, isHydrated]);

  const handleAddToCart = (productId: string, size: string, color: string) => {
    if (!isHydrated) return;
    console.log(`Added to cart: Product ${productId}, Size: ${size}, Color: ${color}`);
  };

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="mb-6 h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="flex gap-8">
          <div className="hidden w-64 flex-shrink-0 space-y-6 lg:block">
            <div className="h-96 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-32 animate-pulse rounded bg-muted" />
              <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="flex gap-8">
        {/* Desktop Filter Panel */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterPanel
              onFilterChange={setFilters}
              productCount={filteredProducts.length}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <MobileFilterPanel
              onFilterChange={setFilters}
              productCount={filteredProducts.length}
            />
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {mockProducts.length} products
              </p>
            </div>
            <SortControls onSortChange={(sortBy: string) => setSortBy(sortBy as SortOption)} />
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogInteractive;
