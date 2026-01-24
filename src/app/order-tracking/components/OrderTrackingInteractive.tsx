'use client';

import TrackingTimeline from './TrackingTimeline';
import OrderDetails from './OrderDetails';
import DeliveryInfo from './DeliveryInfo';
import OrderActions from './OrderActions';
import RelatedOrders from './RelatedOrders';

interface TimelineStage {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  quantity: number;
  variant: string;
  price: number;
}

interface RelatedOrder {
  id: string;
  orderId: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

const OrderTrackingInteractive = () => {
  const trackingStages: TimelineStage[] = [
    {
      id: '1',
      status: 'Order Confirmed',
      description: 'Your order has been confirmed and is being prepared for shipment',
      timestamp: '18/01/2026, 10:30 AM',
      location: 'VMR Solution Warehouse, Mumbai, Maharashtra',
      isCompleted: true,
      isCurrent: false,
    },
    {
      id: '2',
      status: 'Order Packed',
      description: 'Your items have been carefully packed and quality checked',
      timestamp: '19/01/2026, 02:15 PM',
      location: 'VMR Solution Warehouse, Mumbai, Maharashtra',
      isCompleted: true,
      isCurrent: false,
    },
    {
      id: '3',
      status: 'Shipped',
      description: 'Your order has been handed over to the delivery partner',
      timestamp: '20/01/2026, 09:00 AM',
      location: 'Mumbai Logistics Hub, Maharashtra',
      isCompleted: true,
      isCurrent: false,
    },
    {
      id: '4',
      status: 'In Transit',
      description: 'Your package is on the way to your delivery location',
      timestamp: '21/01/2026, 11:45 AM',
      location: 'Pune Distribution Center, Maharashtra',
      isCompleted: false,
      isCurrent: true,
    },
    {
      id: '5',
      status: 'Out for Delivery',
      description: 'Your order is out for delivery and will reach you soon',
      timestamp: 'Expected: 22/01/2026',
      location: 'Local Delivery Hub, Pune',
      isCompleted: false,
      isCurrent: false,
    },
    {
      id: '6',
      status: 'Delivered',
      description: 'Your order has been successfully delivered',
      timestamp: 'Expected: 22/01/2026, 06:00 PM',
      location: 'Your Delivery Address',
      isCompleted: false,
      isCurrent: false,
    },
  ];

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Premium Plastic Flower Pot Set',
      image: 'https://images.pexels.com/photos/6231796/pexels-photo-6231796.jpeg',
      alt: 'Set of three terracotta-colored plastic flower pots with drainage holes arranged on wooden surface',
      quantity: 2,
      variant: 'Large, Terracotta Color',
      price: 599,
    },
    {
      id: '2',
      name: 'Stackable Storage Container Set',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      alt: 'Clear transparent plastic storage containers with blue lids stacked together showing airtight seal',
      quantity: 1,
      variant: 'Medium, 5-Piece Set',
      price: 899,
    },
    {
      id: '3',
      name: 'Heavy Duty Plastic Bucket',
      image: 'https://images.pixabay.com/photo/2017/08/06/22/01/bucket-2596729_1280.jpg',
      alt: 'Blue heavy-duty plastic bucket with metal handle against white background',
      quantity: 3,
      variant: 'Large, 20L Capacity',
      price: 299,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const deliveryCharges = 0;
  const total = subtotal + gst + deliveryCharges;

  const relatedOrders: RelatedOrder[] = [
    {
      id: '1',
      orderId: 'PM2026010015',
      date: '15/01/2026',
      status: 'Delivered',
      total: 1499,
      itemCount: 4,
    },
    {
      id: '2',
      orderId: 'PM2026010008',
      date: '08/01/2026',
      status: 'Delivered',
      total: 2299,
      itemCount: 6,
    },
    {
      id: '3',
      orderId: 'PM2025122520',
      date: '25/12/2025',
      status: 'Delivered',
      total: 899,
      itemCount: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrackingTimeline orderId="PM2026012018" stages={trackingStages} />
        </div>
        <div className="space-y-6">
          <DeliveryInfo
            deliveryPartner="BlueDart Express"
            partnerContact="+91 98765 43210"
            expectedDelivery="22/01/2026, by 06:00 PM"
            deliveryAddress="Flat 301, Sunrise Apartments, Kothrud, Pune, Maharashtra - 411038"
          />
          <OrderActions
            orderId="PM2026012018"
            canCancel={false}
            canReturn={false}
            invoiceUrl="/invoices/PM2026012018.pdf"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderDetails
            items={orderItems}
            subtotal={subtotal}
            gst={gst}
            deliveryCharges={deliveryCharges}
            total={total}
          />
        </div>
        <div>
          <RelatedOrders orders={relatedOrders} />
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingInteractive;
