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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Breadcrumb Category */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Home</span>
          <Icon name="ChevronRightIcon" size={16} />
          <span>{category}</span>
        </div>

        {/* Product Title */}
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          {productName}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={18}
                variant={index < Math.floor(rating) ? 'solid' : 'outline'}
                className={index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-medium">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({reviewCount.toLocaleString('en-IN')} reviews)
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-baseline space-x-3 mb-4">
          <span className="text-3xl font-bold text-primary">
            ₹{selectedVariant?.price.toLocaleString('en-IN') || '0'}
          </span>
          {selectedVariant?.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <Icon
            name={(selectedVariant?.stock || 0) > 10 ? 'CheckCircleIcon' : 'ExclamationTriangleIcon'}
            size={18}
            variant="solid"
            className={(selectedVariant?.stock || 0) > 10 ? 'text-green-600' : 'text-orange-500'}
          />
          <span className="text-sm font-medium">
            {(selectedVariant?.stock || 0) > 10
              ? 'In Stock'
              : `Only ${selectedVariant?.stock || 0} left in stock`}
          </span>
        </div>
      </div>

      {/* Variant Selection */}
      <div className="space-y-6">
        {/* Size Selection */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-foreground">
            Size: <span className="font-normal text-primary">{selectedSize}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`min-w-[60px] rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${selectedSize === size
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:shadow-sm'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-foreground">
            Color: <span className="font-normal text-primary">{selectedColor}</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {uniqueColors.map((colorObj) => (
              <button
                key={colorObj.color}
                onClick={() => handleColorChange(colorObj.color)}
                className={`rounded-full border-2 p-1 transition-all ${selectedColor === colorObj.color
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }`}
              >
                <div
                  className="h-10 w-10 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: colorObj.hex }}
                  title={colorObj.color}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Capacity</p>
          <p className="font-semibold text-foreground">{selectedVariant?.capacity || 'N/A'}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Min Order</p>
          <p className="font-semibold text-foreground">
            {selectedVariant?.minOrderQty || 1} units
          </p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-foreground">Quantity</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= (selectedVariant?.minOrderQty || 1)}
              className="flex h-12 w-12 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="MinusIcon" size={20} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || (selectedVariant?.minOrderQty || 1))}
              className="h-12 w-20 border-x border-gray-200 bg-transparent text-center font-medium text-foreground focus:outline-none"
              min={selectedVariant?.minOrderQty || 1}
              max={selectedVariant?.stock || 999}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (selectedVariant?.stock || 999)}
              className="flex h-12 w-12 items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="PlusIcon" size={20} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            Min: {selectedVariant?.minOrderQty || 1} | Max: {selectedVariant?.stock || 999}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg border-2 border-primary bg-white px-6 py-4 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
          >
            <Icon name="ShoppingCartIcon" size={20} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={toggleWishlist}
            className="flex items-center justify-center rounded-lg border-2 border-gray-200 bg-white px-4 py-4 transition-all hover:border-red-300 hover:bg-red-50"
          >
            <Icon
              name="HeartIcon"
              size={20}
              variant={isWishlisted ? 'solid' : 'outline'}
              className={isWishlisted ? 'text-red-500' : 'text-gray-400'}
            />
          </button>
        </div>

        <button
          onClick={handleBuyNow}
          className="w-full rounded-lg bg-primary px-6 py-4 font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          Buy Now
        </button>
      </div>

      {/* Additional Info */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center space-x-3">
          <Icon name="TruckIcon" size={20} className="text-green-600" />
          <span className="text-sm text-foreground">Free delivery on orders above ₹500</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-blue-600" />
          <span className="text-sm text-foreground">7-day return policy</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="CreditCardIcon" size={20} className="text-purple-600" />
          <span className="text-sm text-foreground">Secure payment options</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;



