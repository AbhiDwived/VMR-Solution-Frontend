'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { config } from '@/config/env';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  status: 'active' | 'inactive';
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${config.apiUrl}/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories.filter((cat: Category) => cat.status === 'active'));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-espresso">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                {category.image ? (
                  <Image 
                    src={`${config.apiUrl.replace('/api', '')}${category.image}`} 
                    alt={category.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="mt-3 text-sm font-medium text-center text-gray-800 group-hover:text-espresso transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}