import type { Metadata } from 'next';
import HomepageInteractive from './home/HomepageInteractive';

export const metadata: Metadata = {
  title: 'VMR Solution - Quality Plastic Household Products | Flower Pots, Mugs, Containers',
  description: 'Shop premium plastic household products including flower pots, mugs, containers, buckets, and dustbins. Best offers, fast delivery, and verified customer reviews. Free shipping on orders above ₹500.',
};

export default function HomePage() {
  return (
    <div className="bg-background">
      <HomepageInteractive />
    </div>
  );
}



