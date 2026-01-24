import Icon from '@/components/ui/AppIcon';

interface DeliveryInfoProps {
  deliveryPartner: string;
  partnerContact: string;
  expectedDelivery: string;
  deliveryAddress: string;
}

const DeliveryInfo = ({
  deliveryPartner,
  partnerContact,
  expectedDelivery,
  deliveryAddress,
}: DeliveryInfoProps) => {
  return (
    <div className="rounded-lg bg-card p-6 shadow-elevation-2">
      <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
        Delivery Information
      </h2>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Icon name="TruckIcon" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Delivery Partner</p>
            <p className="caption mt-1 text-muted-foreground">{deliveryPartner}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Icon name="PhoneIcon" size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Contact Number</p>
            <p className="caption mt-1 text-muted-foreground">{partnerContact}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
            <Icon name="CalendarIcon" size={20} className="text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Expected Delivery</p>
            <p className="caption mt-1 text-muted-foreground">{expectedDelivery}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
            <Icon name="MapPinIcon" size={20} className="text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Delivery Address</p>
            <p className="caption mt-1 text-muted-foreground">{deliveryAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
