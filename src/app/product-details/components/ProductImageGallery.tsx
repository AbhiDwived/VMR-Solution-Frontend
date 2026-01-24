'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  colorVariant?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <AppImage
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-elevation-2 transition-smooth hover:bg-card"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground shadow-elevation-2 transition-smooth hover:bg-card"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 rounded-md bg-card/80 px-3 py-2 text-xs text-foreground">
          <Icon name="MagnifyingGlassPlusIcon" size={16} />
          <span>Click to {isZoomed ? 'zoom out' : 'zoom in'}</span>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 rounded-md bg-card/80 px-3 py-2 text-xs font-medium text-foreground data-text">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 overflow-hidden rounded-md transition-smooth ${
                index === selectedImageIndex
                  ? 'ring-2 ring-primary ring-offset-2' :'opacity-60 hover:opacity-100'
              }`}
            >
              <AppImage
                src={image.url}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
