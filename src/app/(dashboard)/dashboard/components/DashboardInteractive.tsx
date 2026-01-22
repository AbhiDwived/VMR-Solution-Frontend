'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeHeader from './WelcomeHeader';
import QuickActionCard from './QuickActionCard';
import OrderHistoryItem from './OrderHistoryItem';
import WishlistItem from './WishlistItem';
import AddressCard from './AddressCard';
import RecommendedProduct from './RecommendedProduct';
import ActivityFeedItem from './ActivityFeedItem';
import ProfileSection from './ProfileSection';
import Icon from '@/components/ui/AppIcon';

interface Order {
  orderId: string;
  orderDate: string;
  status: string;
  statusColor: string;
  totalAmount: number;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    image: string;
    alt: string;
  }>;
  trackingNumber: string;
}

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  inStock: boolean;
  category: string;
}

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface RecommendedProductType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
}

interface Activity {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

const DashboardInteractive = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const userData = {
    name: 'Rajesh Kumar',
    accountStatus: 'Premium Member',
    loyaltyPoints: 2450,
  };

  const quickStats = {
    totalOrders: 12,
    activeOrders: 3,
    wishlistItems: 8,
  };

  const orders: Order[] = [
    {
      orderId: 'PM2026001234',
      orderDate: '18/01/2026',
      status: 'In Transit',
      statusColor: 'bg-accent/10 text-accent',
      totalAmount: 1847,
      products: [
        {
          id: '1',
          name: 'Premium Storage Container Set (5 Pieces)',
          quantity: 1,
          image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
          alt: 'Set of five transparent plastic storage containers with blue lids arranged on white surface',
        },
        {
          id: '2',
          name: 'Large Plastic Bucket - 20L',
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce',
          alt: 'Blue plastic bucket with metal handle on wooden floor',
        },
      ],
      trackingNumber: 'TRK2026PM789456',
    },
    {
      orderId: 'PM2026001189',
      orderDate: '12/01/2026',
      status: 'Delivered',
      statusColor: 'bg-success/10 text-success',
      totalAmount: 2345,
      products: [
        {
          id: '3',
          name: 'Decorative Flower Pots Set (3 Sizes)',
          quantity: 1,
          image: 'https://images.pixabay.com/photo/2016/11/29/12/13/pot-1869758_1280.jpg',
          alt: 'Three terracotta-colored plastic flower pots of different sizes with drainage holes',
        },
      ],
      trackingNumber: 'TRK2026PM654321',
    },
    {
      orderId: 'PM2026001098',
      orderDate: '05/01/2026',
      status: 'Delivered',
      statusColor: 'bg-success/10 text-success',
      totalAmount: 1299,
      products: [
        {
          id: '4',
          name: 'Kitchen Organizer Bins (Set of 4)',
          quantity: 1,
          image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg',
          alt: 'Four white plastic organizer bins with handles arranged on kitchen counter',
        },
      ],
      trackingNumber: 'TRK2026PM123789',
    },
  ];

  const wishlistProducts: WishlistProduct[] = [
    {
      id: '5',
      name: 'Premium Insulated Water Bottle - 1L',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
      alt: 'Stainless steel insulated water bottle with blue plastic cap on wooden table',
      inStock: true,
      category: 'Drinkware',
    },
    {
      id: '6',
      name: 'Modular Kitchen Storage Containers (6 Pieces)',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg',
      alt: 'Six transparent plastic containers with colorful lids stacked on kitchen shelf',
      inStock: true,
      category: 'Kitchen Storage',
    },
    {
      id: '7',
      name: 'Large Garden Planter with Drainage',
      price: 899,
      image: 'https://images.pixabay.com/photo/2017/08/01/11/48/flower-pot-2564684_1280.jpg',
      alt: 'Large brown plastic planter with drainage holes filled with green plants',
      inStock: false,
      category: 'Gardening',
    },
    {
      id: '8',
      name: 'Multi-Purpose Dustbin with Lid - 25L',
      price: 749,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce',
      alt: 'Gray plastic dustbin with pedal-operated lid in modern kitchen setting',
      inStock: true,
      category: 'Home Utility',
    },
  ];

  const addresses: Address[] = [
    {
      id: '1',
      name: 'Home',
      addressLine1: '123, Green Valley Apartments',
      addressLine2: 'Sector 15, Rohini',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110085',
      phone: '9876543210',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Office',
      addressLine1: 'Plot No. 45, Industrial Area',
      addressLine2: 'Phase 2, Udyog Vihar',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122016',
      phone: '9876543211',
      isDefault: false,
    },
  ];

  const recommendedProducts: RecommendedProductType[] = [
    {
      id: '9',
      name: 'Stackable Food Storage Containers',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg',
      alt: 'Stack of transparent plastic food containers with airtight lids on kitchen counter',
      rating: 4.5,
      reviewCount: 234,
    },
    {
      id: '10',
      name: 'Colorful Plastic Mugs Set (6 Pieces)',
      price: 449,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
      alt: 'Six colorful plastic mugs in red, blue, green, yellow, orange, and purple arranged in circle',
      rating: 4.2,
      reviewCount: 156,
    },
    {
      id: '11',
      name: 'Heavy Duty Plastic Bucket - 25L',
      price: 599,
      originalPrice: 749,
      image: 'https://images.pixabay.com/photo/2016/11/29/12/13/bucket-1869760_1280.jpg',
      alt: 'Large red plastic bucket with reinforced rim and metal handle',
      rating: 4.7,
      reviewCount: 189,
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      icon: 'TruckIcon',
      iconColor: 'bg-accent',
      title: 'Order Shipped',
      description: 'Your order #PM2026001234 has been shipped and is on the way',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      icon: 'HeartIcon',
      iconColor: 'bg-error',
      title: 'Added to Wishlist',
      description: 'Premium Insulated Water Bottle added to your wishlist',
      timestamp: '1 day ago',
    },
    {
      id: '3',
      icon: 'CheckCircleIcon',
      iconColor: 'bg-success',
      title: 'Order Delivered',
      description: 'Order #PM2026001189 has been successfully delivered',
      timestamp: '6 days ago',
    },
    {
      id: '4',
      icon: 'StarIcon',
      iconColor: 'bg-warning',
      title: 'Review Submitted',
      description: 'Thank you for reviewing Decorative Flower Pots Set',
      timestamp: '1 week ago',
    },
  ];

  const profileData: ProfileData = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '9876543210',
    dateOfBirth: '15/08/1985',
  };

  const handleRemoveFromWishlist = (productId: string) => {
    console.log('Remove from wishlist:', productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    router.push('/shopping-cart');
  };

  const handleEditAddress = (addressId: string) => {
    console.log('Edit address:', addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    console.log('Delete address:', addressId);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    console.log('Set default address:', addressId);
  };

  const handleSaveProfile = (data: ProfileData) => {
    console.log('Save profile:', data);
  };

  const tabs = [
    { id: 'orders' as const, label: 'Order History', icon: 'ShoppingBagIcon' },
    { id: 'wishlist' as const, label: 'Wishlist', icon: 'HeartIcon' },
    { id: 'addresses' as const, label: 'Addresses', icon: 'MapPinIcon' },
    { id: 'profile' as const, label: 'Profile', icon: 'UserIcon' },
  ];

  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={userData.name}
        accountStatus={userData.accountStatus}
        loyaltyPoints={userData.loyaltyPoints}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <QuickActionCard
          title="Total Orders"
          value={quickStats.totalOrders}
          icon="ShoppingBagIcon"
          bgColor="bg-primary"
          textColor="text-primary-foreground"
          onClick={() => setActiveTab('orders')}
        />
        <QuickActionCard
          title="Active Orders"
          value={quickStats.activeOrders}
          icon="TruckIcon"
          bgColor="bg-accent"
          textColor="text-accent-foreground"
          onClick={() => router.push('/order-tracking')}
        />
        <QuickActionCard
          title="Wishlist Items"
          value={quickStats.wishlistItems}
          icon="HeartIcon"
          bgColor="bg-secondary"
          textColor="text-secondary-foreground"
          onClick={() => setActiveTab('wishlist')}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card shadow-elevation-1">
            <div className="border-b border-border">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center space-x-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-smooth ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab.icon as any} size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-6">
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      Order History
                    </h2>
                    <button className="flex items-center space-x-1 text-sm text-primary transition-smooth hover:text-primary/80">
                      <Icon name="FunnelIcon" size={16} />
                      <span>Filter</span>
                    </button>
                  </div>
                  {orders.map((order) => (
                    <OrderHistoryItem key={order.orderId} {...order} />
                  ))}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      My Wishlist
                    </h2>
                    <p className="caption text-muted-foreground">
                      {wishlistProducts.length} items
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {wishlistProducts.map((product) => (
                      <WishlistItem
                        key={product.id}
                        {...product}
                        onRemove={() => handleRemoveFromWishlist(product.id)}
                        onAddToCart={() => handleAddToCart(product.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-semibold text-card-foreground">
                      Saved Addresses
                    </h2>
                    <button className="flex items-center space-x-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:scale-[0.97]">
                      <Icon name="PlusIcon" size={16} />
                      <span>Add New</span>
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        {...address}
                        onEdit={() => handleEditAddress(address.id)}
                        onDelete={() => handleDeleteAddress(address.id)}
                        onSetDefault={() => handleSetDefaultAddress(address.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <ProfileSection
                  profileData={profileData}
                  onSave={handleSaveProfile}
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
            <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <ActivityFeedItem key={activity.id} {...activity} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 shadow-elevation-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">
                Recommended for You
              </h3>
              <button
                onClick={() => router.push('/product-catalog')}
                className="text-sm text-primary transition-smooth hover:text-primary/80"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recommendedProducts.map((product) => (
                <RecommendedProduct key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;