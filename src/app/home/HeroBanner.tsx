'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
  bgColor: string;
}

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: '1',
      title: 'New Year Sale - Up to 50% Off',
      subtitle: 'Premium plastic household products at unbeatable prices',
      ctaText: 'Shop Now',
      ctaLink: '/product-catalog',
      image: 'https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg',
      alt: 'Colorful plastic containers and storage solutions arranged on modern kitchen counter',
      bgColor: 'bg-primary/10',
    },
    {
      id: '2',
      title: 'Fresh Arrivals - Garden Collection',
      subtitle: 'Beautiful flower pots and planters for your green space',
      ctaText: 'Explore Collection',
      ctaLink: '/product-catalog',
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      alt: 'Elegant ceramic flower pots with lush green plants in modern home setting',
      bgColor: 'bg-secondary/10',
    },
    {
      id: '3',
      title: 'Bulk Orders - Special Discounts',
      subtitle: 'Save more when you buy in bulk. Perfect for businesses',
      ctaText: 'Get Quote',
      ctaLink: '/product-catalog',
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      alt: 'Industrial plastic buckets and containers stacked for bulk purchase',
      bgColor: 'bg-accent/10',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 ${slide.bgColor}`} />
            <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
              <div className="z-10 space-y-6 text-center lg:text-left">
                <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center space-x-2 rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-smooth hover:scale-[0.97]"
                >
                  <span>{slide.ctaText}</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>
              </div>
              <div className="relative hidden h-full lg:block">
                <AppImage
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card p-3 shadow-elevation-3 transition-smooth hover:scale-110"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeftIcon" size={24} className="text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card p-3 shadow-elevation-3 transition-smooth hover:scale-110"
        aria-label="Next slide"
      >
        <Icon name="ChevronRightIcon" size={24} className="text-foreground" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-smooth ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-3 bg-muted'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;