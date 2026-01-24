'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  avatar: string;
  verified: boolean;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      comment: 'Excellent quality containers! They are airtight and keep my food fresh for days. The delivery was super fast too.',
      productPurchased: 'Airtight Food Storage Container Set',
      date: 'Jan 10, 2026',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      verified: true,
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      location: 'Delhi, NCR',
      rating: 5,
      comment: 'Best flower pots I have purchased online. The colors are vibrant and they look premium. Highly recommended!',
      productPurchased: 'Premium Ceramic Flower Pot',
      date: 'Jan 8, 2026',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      verified: true,
    },
    {
      id: '3',
      name: 'Anita Desai',
      location: 'Bangalore, Karnataka',
      rating: 4,
      comment: 'Good value for money. The mugs are sturdy and perfect for daily use. Will definitely order more products.',
      productPurchased: 'Colorful Plastic Mugs Set',
      date: 'Jan 5, 2026',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: true,
    },
  ];

  return (
    <section className="bg-muted/30 py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-8 text-center" data-aos="fade-up">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-secondary" variant="solid" />
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Customer Testimonials
            </h2>
          </div>
          <p className="text-muted-foreground">
            What our customers say about us
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border bg-card p-6 shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <AppImage
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile picture`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">{testimonial.name}</h3>
                    <p className="caption text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <div className="flex items-center space-x-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                    <Icon name="CheckBadgeIcon" size={14} variant="solid" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="mb-3 flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={16}
                    variant={i < testimonial.rating ? 'solid' : 'outline'}
                    className={i < testimonial.rating ? 'text-accent' : 'text-muted-foreground'}
                  />
                ))}
              </div>

              <p className="mb-4 text-sm text-card-foreground">{testimonial.comment}</p>

              <div className="border-t border-border pt-4">
                <p className="caption mb-1 text-muted-foreground">Purchased:</p>
                <p className="text-sm font-medium text-card-foreground">{testimonial.productPurchased}</p>
                <p className="caption mt-2 text-muted-foreground">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
