'use client';

import { useSearchParams } from 'next/navigation';
import { useGetOrderByIdQuery } from '@/store/api/orderApi';
import TrackingTimeline from './TrackingTimeline';
import OrderDetails from './OrderDetails';
import DeliveryInfo from './DeliveryInfo';
import OrderActions from './OrderActions';
import RelatedOrders from './RelatedOrders';

const OrderTrackingInteractive = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { data, isLoading, error } = useGetOrderByIdQuery(orderId || '', { skip: !orderId });

  if (!orderId) {
    return (
      <div className="rounded-md bg-card p-8 text-center">
        <p className="text-muted-foreground">Please provide an order ID to track</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 animate-pulse rounded-md bg-muted" />
        <div className="h-48 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="rounded-md bg-card p-8 text-center">
        <p className="text-error">Order not found or you don't have access to this order</p>
      </div>
    );
  }

  const order = data.order;
  const address = JSON.parse(order.address || '{}');
  
  const getTrackingStages = (status: string) => {
    const stages = [
      { id: '1', status: 'Order Confirmed', description: 'Your order has been confirmed', isCompleted: true, isCurrent: false },
      { id: '2', status: 'Order Packed', description: 'Your items have been packed', isCompleted: status !== 'pending', isCurrent: status === 'confirmed' },
      { id: '3', status: 'Shipped', description: 'Your order has been shipped', isCompleted: ['shipped', 'delivered'].includes(status), isCurrent: status === 'shipped' },
      { id: '4', status: 'Delivered', description: 'Your order has been delivered', isCompleted: status === 'delivered', isCurrent: status === 'delivered' },
    ];
    return stages.map(s => ({ ...s, timestamp: order.updated_at, location: 'India' }));
  };

  const orderItems = order.items?.map((item: any) => {
    let images = []
    try {
      images = typeof item.product_images === 'string' ? JSON.parse(item.product_images) : item.product_images
    } catch (e) {
      images = []
    }
    return {
      id: item.id.toString(),
      name: item.name,
      image: Array.isArray(images) ? images[0] || '' : '',
      alt: item.name,
      quantity: item.quantity,
      variant: '',
      price: item.price,
    }
  }) || [];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrackingTimeline orderId={`ORD${orderId}`} stages={getTrackingStages(order.status)} />
        </div>
        <div className="space-y-6">
          <DeliveryInfo
            deliveryPartner="Standard Delivery"
            partnerContact="+91 98765 43210"
            expectedDelivery="5-7 business days"
            deliveryAddress={`${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`}
          />
          <OrderActions
            orderId={`ORD${orderId}`}
            canCancel={order.status === 'pending'}
            canReturn={order.status === 'delivered'}
            invoiceUrl={`/invoices/${orderId}.pdf`}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OrderDetails
            items={orderItems}
            subtotal={order.subtotal}
            gst={order.gst}
            deliveryCharges={order.delivery_charges}
            total={order.total}
          />
        </div>
        <div>
          <RelatedOrders orders={[]} />
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingInteractive;



