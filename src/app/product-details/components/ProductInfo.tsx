'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  capacity: string;
  price: number;
  originalPrice?: number;
  stock: number;
  minOrderQty: number;
}

interface ProductInfoProps {
  productName: string;
  category: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  onVariantChange: (_variant: ProductVariant) => void;
  onAddToCart: (_quantity: number) => void;
  onBuyNow: (_quantity: number) => void;
}

const ProductInfo = ({
  productName,
  category,
  rating,
  reviewCount,
  variants,
  onVariantChange,
  onAddToCart,
  onBuyNow,
}: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(variants[0]);
  const [quantity, setQuantity] = useState(variants[0]?.minOrderQty || 1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const uniqueSizes = Array.from(new Set(variants.map((v) => v.size)));
  const uniqueColors = Array.from(
    new Set(variants.map((v) => JSON.stringify({ color: v.color, hex: v.colorHex })))
  ).map((str) => JSON.parse(str));

  const [selectedSize, setSelectedSize] = useState(selectedVariant?.size || '');
  const [selectedColor, setSelectedColor] = useState(selectedVariant?.color || '');

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const newVariant = variants.find((v) => v.size === size && v.color === selectedColor);
    if (newVariant) {
      setSelectedVariant(newVariant);
      setQuantity(newVariant.minOrderQty);
      onVariantChange(newVariant);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const newVariant = variants.find((v) => v.size === selectedSize && v.color === color);
    if (newVariant) {
      setSelectedVariant(newVariant);
      setQuantity(newVariant.minOrderQty);
      onVariantChange(newVariant);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (selectedVariant && newQuantity >= selectedVariant.minOrderQty && newQuantity <= selectedVariant.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(quantity);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = selectedVariant?.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Title & Category */}
      <div>
        <p className="caption mb-2 text-muted-foreground">{category}</p>
        <h1 className="font-heading text-3xl font-bold text-foreground lg:text-4xl">
          {productName}
        </h1>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={20}
              variant={index < Math.floor(rating) ? 'solid' : 'outline'}
              className={index < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
            />
          ))}
        </div>
        <span className="data-text text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
        <span className="caption text-muted-foreground">
          ({reviewCount.toLocaleString('en-IN')} reviews)
        </span>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline space-x-3">
        <span className="data-text text-3xl font-bold text-primary">
          ₹{selectedVariant?.price.toLocaleString('en-IN') || '0'}
        </span>
        {selectedVariant?.originalPrice && (
          <>
            <span className="data-text text-xl text-muted-foreground line-through">
              ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="rounded-md bg-success/10 px-2 py-1 text-sm font-medium text-success">
              {discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon
          name={(selectedVariant?.stock || 0) > 10 ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
          size={20}
          variant="solid"
          className={(selectedVariant?.stock || 0) > 10 ? 'text-success' : 'text-warning'}
        />
        <span className="text-sm font-medium text-foreground">
          {(selectedVariant?.stock || 0) > 10
            ? 'In Stock'
            : `Only ${selectedVariant?.stock || 0} left in stock`}
        </span>
      </div>

      {/* Size Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Size: <span className="text-primary">{selectedSize}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {uniqueSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-smooth ${
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Color: <span className="text-primary">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {uniqueColors.map((colorObj) => (
            <button
              key={colorObj.color}
              onClick={() => handleColorChange(colorObj.color)}
              className={`transition-smooth border-2 rounded-full p-1 ${
                selectedColor === colorObj.color
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <div
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: colorObj.hex }}
                title={colorObj.color}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Capacity & Specifications */}
      <div className="rounded-lg bg-muted p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="caption text-muted-foreground">Capacity</p>
            <p className="data-text font-medium text-foreground">{selectedVariant?.capacity || 'N/A'}</p>
          </div>
          <div>
            <p className="caption text-muted-foreground">Min. Order Qty</p>
            <p className="data-text font-medium text-foreground">
              {selectedVariant?.minOrderQty || 1} units
            </p>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label htmlFor="quantity-input" className="mb-3 block text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-md border border-border bg-background">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= (selectedVariant?.minOrderQty || 1)}
              className="flex h-10 w-10 items-center justify-center text-foreground transition-smooth hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="MinusIcon" size={20} />
            </button>
            <input
              id="quantity-input"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || (selectedVariant?.minOrderQty || 1))}
              className="data-text h-10 w-20 border-x border-border bg-transparent text-center text-foreground focus:outline-none"
              min={selectedVariant?.minOrderQty || 1}
              max={selectedVariant?.stock || 999}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (selectedVariant?.stock || 999)}
              className="flex h-10 w-10 items-center justify-center text-foreground transition-smooth hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="PlusIcon" size={20} />
            </button>
          </div>
          <span className="caption text-muted-foreground">
            (Min: {selectedVariant?.minOrderQty || 1}, Max: {selectedVariant?.stock || 999})
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <button
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-smooth hover:scale-[0.98]"
        >
          <Icon name="ShoppingCartIcon" size={20} />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center space-x-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground transition-smooth hover:scale-[0.98]"
        >
          <Icon name="BoltIcon" size={20} />
          <span>Buy Now</span>
        </button>
        <button
          onClick={toggleWishlist}
          className="flex items-center justify-center rounded-md border-2 border-border bg-background px-4 py-3 transition-smooth hover:border-primary"
        >
          <Icon
            name="HeartIcon"
            size={24}
            variant={isWishlisted ? 'solid' : 'outline'}
            className={isWishlisted ? 'text-error' : 'text-foreground'}
          />
        </button>
      </div>

      {/* Share Options */}
      <div className="flex items-center space-x-3 border-t border-border pt-6">
        <span className="text-sm font-medium text-foreground">Share:</span>
        <button className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-smooth hover:bg-muted">
          <Icon name="ShareIcon" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;



