'use client';

import { useState, useEffect } from 'react';
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
  allVariantImages?: ProductImage[];
  productName: string;
}

const ProductImageGallery = ({ images, allVariantImages, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImages, setCurrentImages] = useState<ProductImage[]>(images);

  // Reset selected image index when images change
  useEffect(() => {
    setSelectedImageIndex(0);
    setIsZoomed(false);
    setCurrentImages(images);
  }, [images]);

  const handlePrevious = () => {
    const imagesToUse = allVariantImages || images;
    const newIndex = selectedImageIndex === 0 ? imagesToUse.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
    setCurrentImages([imagesToUse[newIndex]]);
  };

  const handleNext = () => {
    const imagesToUse = allVariantImages || images;
    const newIndex = selectedImageIndex === imagesToUse.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
    setCurrentImages([imagesToUse[newIndex]]);
  };

  const handleThumbnailClick = (index: number) => {
    const imagesToUse = allVariantImages || images;
    setSelectedImageIndex(index);
    // Update current images to show the clicked image
    setCurrentImages([imagesToUse[index]]);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <AppImage
          key={`${currentImages[0]?.id}-${selectedImageIndex}`}
          src={currentImages[0]?.url || ''}
          alt={currentImages[0]?.alt || ''}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
        />

        {/* Navigation Arrows */}
        {(allVariantImages || images).length > 1 && (
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
          {selectedImageIndex + 1} / {(allVariantImages || images).length}
        </div>
      </div>

      {/* Small Image Icons - All Variants */}
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {(allVariantImages || images).map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 overflow-hidden rounded border transition-smooth ${
              index === selectedImageIndex ? 'border-primary' : 'border-gray-300 hover:border-primary'
            }`}
          >
            <AppImage
              src={image.url}
              alt={`${productName} icon ${index + 1}`}
              className="h-10 w-10 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;



