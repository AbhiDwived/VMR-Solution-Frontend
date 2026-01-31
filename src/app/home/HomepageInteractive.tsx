'use client';

import { useState, useEffect } from 'react';
import HeroBanner from './HeroBanner';
import FeaturedProducts from './FeaturedProducts';
import TrendingProducts from './TrendingProducts';
import NewArrivals from './NewArrivals';
import OffersSection from './OffersSection';
import Testimonials from './Testimonials';
import BlogSection from './BlogSection';
import NewsletterSignup from './NewsletterSignup';
import SocialProofNotification from './SocialProofNotification';

const HomepageInteractive = () => {
  const [showSocialProof, setShowSocialProof] = useState(false);

  useEffect(() => {
    // Social proof notifications
    const socialProofInterval = setInterval(() => {
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 15000);

    return () => {
      clearInterval(socialProofInterval);
    };
  }, []);

  return (
    <main className="w-full">
      <HeroBanner />
      <NewArrivals />
      <FeaturedProducts />

      <TrendingProducts />

      <OffersSection />
      <Testimonials />
      <BlogSection />
      <NewsletterSignup />

      {showSocialProof && <SocialProofNotification />}
    </main>
  );
};

export default HomepageInteractive;



