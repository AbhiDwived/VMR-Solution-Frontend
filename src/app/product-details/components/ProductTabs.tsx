'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Specification {
  label: string;
  value: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  rating: number;
}

interface ProductTabsProps {
  specifications: Specification[];
  careInstructions: string[];
  warrantyInfo: string;
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}

type TabType = 'specifications' | 'care' | 'warranty' | 'reviews';

const ProductTabs = ({
  specifications,
  careInstructions,
  warrantyInfo,
  reviews,
  relatedProducts,
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('specifications');

  const tabs = [
    { id: 'specifications' as TabType, label: 'Specifications', icon: 'DocumentTextIcon' },
    { id: 'care' as TabType, label: 'Care Instructions', icon: 'SparklesIcon' },
    { id: 'warranty' as TabType, label: 'Warranty', icon: 'ShieldCheckIcon' },
    { id: 'reviews' as TabType, label: `Reviews (${reviews.length})`, icon: 'StarIcon' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Product Specifications
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between rounded-lg bg-muted p-4"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="data-text text-sm font-medium text-foreground">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Care Instructions Tab */}
        {activeTab === 'care' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Care Instructions
            </h3>
            <div className="space-y-3">
              {careInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    variant="solid"
                    className="mt-0.5 flex-shrink-0 text-success"
                  />
                  <p className="text-sm text-foreground">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warranty Tab */}
        {activeTab === 'warranty' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Warranty Information
            </h3>
            <div className="rounded-lg bg-muted p-6">
              <div className="mb-4 flex items-center space-x-3">
                <Icon name="ShieldCheckIcon" size={32} variant="solid" className="text-success" />
                <div>
                  <p className="font-medium text-foreground">Manufacturer Warranty</p>
                  <p className="caption text-muted-foreground">Quality Guaranteed</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{warrantyInfo}</p>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                Customer Reviews
              </h3>
              <button className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.98]">
                <Icon name="PencilIcon" size={16} />
                <span>Write Review</span>
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center space-x-2">
                        <p className="font-medium text-card-foreground">{review.userName}</p>
                        {review.verified && (
                          <span className="flex items-center space-x-1 rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                            <Icon name="CheckBadgeIcon" size={14} variant="solid" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                      <p className="caption text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          name="StarIcon"
                          size={16}
                          variant={index < review.rating ? 'solid' : 'outline'}
                          className={
                            index < review.rating ? 'text-accent' : 'text-muted-foreground'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-card-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;



