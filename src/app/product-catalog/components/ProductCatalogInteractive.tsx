'use client';

import { useState, useEffect } from 'react';
import FilterPanel, { FilterState } from './FilterPanel';
import SortControls, { SortOption } from './SortControls';
import ProductGrid from './ProductGrid';
import MobileFilterPanel from './MobileFilterPanel';
import { Product } from './ProductCard';
import { products as productData } from '@/data/products';

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

  // Convert product data to match Product interface
  const mockProducts: Product[] = productData.map(product => ({
    id: product.id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    alt: product.description,
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['White', 'Blue', 'Red', 'Green'],
    capacity: '500ml',
    inStock: product.inStock,
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    isNew: Math.random() > 0.7,
    isBestseller: Math.random() > 0.8,
  }));

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
      <div className="w-full px-1 py-8 sm:px-6">
        <div className="mb-6 h-10 w-48 animate-pulse rounded bg-muted" />
        <div className="flex gap-1 sm:gap-8">
          <div className="hidden w-64 flex-shrink-0 space-y-6 lg:block">
            <div className="h-96 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-32 animate-pulse rounded bg-muted" />
              <div className="h-10 w-48 animate-pulse rounded bg-muted" />
            </div>
            <div className="grid grid-cols-2 gap-1 sm:gap-6 lg:grid-cols-6">
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
    <div className="w-full px-0 py-4 sm:px-6">
      <div className="flex gap-0 sm:gap-8">
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
          <div className="mb-4 flex items-center justify-between gap-2 px-1 sm:mb-6 sm:gap-4 sm:px-0">
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