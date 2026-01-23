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
import ExitIntentPopup from './ExitIntentPopup';

const HomepageInteractive = () => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(false);

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Social proof notifications
    const socialProofInterval = setInterval(() => {
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 15000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
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
      {showExitPopup && <ExitIntentPopup onClose={() => setShowExitPopup(false)} />}
    </main>
  );
};

export default HomepageInteractive;