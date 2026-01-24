'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6" data-aos="fade-up">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/20 p-4">
            <Icon name="EnvelopeIcon" size={48} className="text-white" variant="solid" />
          </div>
        </div>
        <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Get exclusive deals, new product updates, and home organization tips delivered to your inbox
        </p>

        {!isSubscribed ? (
          <>
            <form onSubmit={handleSubmit} className="mx-auto mb-6 max-w-[500px]">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-md border-2 border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-smooth focus:border-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 rounded-md bg-white px-6 py-3 font-medium text-primary transition-smooth hover:scale-[0.97] disabled:opacity-50"
                >
                  {isLoading ? (
                    <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Icon name="PaperAirplaneIcon" size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-2 rounded-lg bg-accent px-6 py-3 text-white">
              <Icon name="GiftIcon" size={24} variant="solid" />
              <span className="font-medium">Get 10% OFF on your first order after subscribing!</span>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-[500px] rounded-lg bg-white/20 p-6 backdrop-blur-sm">
            <div className="mb-3 flex justify-center">
              <Icon name="CheckCircleIcon" size={48} className="text-white" variant="solid" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Successfully Subscribed!</h3>
            <p className="text-white/90">
              Check your email for your exclusive 10% discount code.
            </p>
          </div>
        )}

        <p className="mt-6 text-sm text-white/70">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;



