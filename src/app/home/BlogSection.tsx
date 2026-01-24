'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  date: string;
  readTime: string;
}

const BlogSection = () => {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Best Plastic Buckets for Every Household Need in 2025',
      excerpt: 'Discover our range of durable plastic buckets from 5L to 25L capacity. Perfect for cleaning, storage, and industrial use.',
      image: '/assets/products/1.jpg',
      alt: 'VMR Solution plastic buckets in different sizes and colors',
      category: 'Product Guide',
      date: 'Jan 15, 2025',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Traditional Patlas: Modern Manufacturing, Timeless Design',
      excerpt: 'Learn about our premium quality patlas made with food-grade plastic. From Pancham to Elephanta designs.',
      image: '/assets/products/55.jpg',
      alt: 'Traditional plastic patlas showcasing various designs and sizes',
      category: 'Heritage Products',
      date: 'Jan 12, 2025',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'Kitchen Organization Made Easy with VMR Containers',
      excerpt: 'Transform your kitchen with our range of storage containers, lunch boxes, and kitchen accessories.',
      image: '/assets/products/vmr (19).jpg',
      alt: 'VMR kitchen products including containers and storage solutions',
      category: 'Home Tips',
      date: 'Jan 8, 2025',
      readTime: '6 min read',
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 flex items-center justify-between" data-aos="fade-up">
        <div>
          <div className="mb-2 flex items-center space-x-2">
            <Icon name="NewspaperIcon" size={32} className="text-primary" variant="solid" />
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Latest from Our Blog
            </h2>
          </div>
          <p className="text-muted-foreground">
            Tips, guides, and inspiration for your home
          </p>
        </div>
        <Link
          href="/product-catalog"
          className="flex items-center space-x-1 text-sm font-medium text-primary transition-smooth hover:underline"
        >
          <span>View All Posts</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-elevation-1 transition-smooth hover:shadow-elevation-2"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <AppImage
                src={post.image}
                alt={post.alt}
                className="h-full w-full object-cover transition-smooth group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 line-clamp-2 font-heading text-lg font-bold text-card-foreground transition-smooth group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="CalendarIcon" size={14} />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="ClockIcon" size={14} />
                    <span>{post.readTime}</span>
                  </span>
                </div>
                <Link
                  href="/product-catalog"
                  className="flex items-center space-x-1 font-medium text-primary transition-smooth hover:underline"
                >
                  <span>Read More</span>
                  <Icon name="ArrowRightIcon" size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;



