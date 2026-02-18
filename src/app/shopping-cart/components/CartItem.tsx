'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItemData {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove, onSaveForLater }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 1) {
      onQuantityChange(item.id, newQty);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-smooth sm:flex-row ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Product Image */}
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <AppImage
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-smooth hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">
                {item.name}
              </h3>
              {item.variant && (
                <p className="mt-1 text-sm text-muted-foreground">{item.variant}</p>
              )}
            </div>
            <button
              onClick={handleRemove}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-smooth hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove item"
            >
              <Icon name="TrashIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Qty:</span>
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="flex h-8 w-8 items-center justify-center text-foreground transition-smooth hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Icon name="MinusIcon" size={16} />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    handleQuantityChange(val);
                  }}
                  min={1}
                  className="data-text h-8 w-16 border-x border-border bg-transparent text-center text-sm focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center text-foreground transition-smooth hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="data-text text-xl font-semibold text-primary">
                ₹{itemTotal.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Save for Later */}
        <button
          onClick={() => onSaveForLater(item.id)}
          className="mt-3 flex items-center gap-2 text-sm text-primary transition-smooth hover:underline"
        >
          <Icon name="BookmarkIcon" size={16} />
          Save for Later
        </button>
      </div>
    </div>
  );
}



