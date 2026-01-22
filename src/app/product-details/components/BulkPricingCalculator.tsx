'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
  discount: number;
}

interface BulkPricingCalculatorProps {
  pricingTiers: PricingTier[];
  basePrice: number;
}

const BulkPricingCalculator = ({ pricingTiers, basePrice }: BulkPricingCalculatorProps) => {
  const [calculatorQty, setCalculatorQty] = useState(100);

  const calculatePrice = (qty: number): { total: number; perUnit: number; savings: number } => {
    const tier = pricingTiers.find(
      (t) => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)
    );

    const pricePerUnit = tier ? tier.pricePerUnit : basePrice;
    const total = pricePerUnit * qty;
    const savings = (basePrice - pricePerUnit) * qty;

    return { total, perUnit: pricePerUnit, savings };
  };

  const pricing = calculatePrice(calculatorQty);

  return (
    <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
      <div className="mb-4 flex items-center space-x-3">
        <Icon name="CalculatorIcon" size={28} className="text-primary" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            Bulk Pricing Calculator
          </h3>
          <p className="caption text-muted-foreground">
            Calculate savings on bulk orders
          </p>
        </div>
      </div>

      {/* Quantity Input */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Enter Quantity
        </label>
        <input
          type="number"
          value={calculatorQty}
          onChange={(e) => setCalculatorQty(parseInt(e.target.value) || 0)}
          className="data-text w-full rounded-md border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          min="1"
        />
      </div>

      {/* Pricing Result */}
      <div className="mb-6 space-y-3 rounded-lg bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-card-foreground">Price per unit:</span>
          <span className="data-text text-lg font-semibold text-primary">
            ₹{pricing.perUnit.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-card-foreground">Total amount:</span>
          <span className="data-text text-xl font-bold text-foreground">
            ₹{pricing.total.toLocaleString('en-IN')}
          </span>
        </div>
        {pricing.savings > 0 && (
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-medium text-success">You save:</span>
            <span className="data-text text-lg font-bold text-success">
              ₹{pricing.savings.toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </div>

      {/* Pricing Tiers */}
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Bulk Pricing Tiers:</p>
        <div className="space-y-2">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-md p-3 transition-smooth ${
                calculatorQty >= tier.minQty &&
                (tier.maxQty === null || calculatorQty <= tier.maxQty)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <span className="text-sm">
                {tier.minQty}
                {tier.maxQty ? `-${tier.maxQty}` : '+'} units
              </span>
              <div className="flex items-center space-x-2">
                <span className="data-text text-sm font-medium">
                  ₹{tier.pricePerUnit.toLocaleString('en-IN')}
                </span>
                {tier.discount > 0 && (
                  <span className="rounded-md bg-success/20 px-2 py-0.5 text-xs font-medium">
                    {tier.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkPricingCalculator;