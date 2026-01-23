'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductImage {
  src: string;
  alt: string;
}

interface HeroBannerProps {
  title?: string;
  discount?: string;
  productImages?: ProductImage[];
  categoryImages?: ProductImage[];
}

const HeroBanner = ({
  title = "PAY DAY",
  discount = "UP TO 50% OFF",
  productImages = [
    { src: "/assets/products/bucket (1).jpg", alt: "Plastic Bucket" },
    { src: "/assets/products/vmr (15).jpg", alt: "Plastic Dustbin" },
    { src: "/assets/products/vmr (25).jpg", alt: "Plastic Container" }
  ],
  categoryImages = [
    { src: "/assets/products/vmr (5).jpg", alt: "Plastic Gamla (Flower Pot)" },
    { src: "/assets/products/bucket (3).jpg", alt: "Plastic Bucket" }
  ]
}: HeroBannerProps) => {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-green-50 to-white shadow-lg h-[300px] md:h-[400px] lg:h-[500px]">
        {/* Decorative shapes */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50"></div>
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-green-100/50"></div>
        <div className="absolute right-1/4 top-1/3 h-4 w-4 rounded-full bg-blue-200/60"></div>
        <div className="absolute bottom-1/4 left-1/3 h-6 w-6 rounded-full bg-green-200/60"></div>

        <div className="relative flex h-full gap-4 p-4">
          {/* Left section - 2 horizontal images (70% width) */}
          <div className="w-[70%] flex flex-col gap-2">
            {/* Top image - 70% height of banner */}
            <div className="h-[70%] group relative overflow-hidden rounded-lg bg-white p-2 shadow-md transition-transform hover:scale-105">
              <Image
                src={categoryImages[0].src}
                alt={categoryImages[0].alt}
                width={500}
                height={350}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Bottom image - 30% height of banner */}
            <div className="h-[30%] group relative overflow-hidden rounded-lg bg-white p-2 shadow-md transition-transform hover:scale-105">
              <Image
                src={categoryImages[1].src}
                alt={categoryImages[1].alt}
                width={500}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right section - 1 vertical image with text overlay (30% width) */}
          <div className="w-[30%]">
            <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-md">
              <Image
                src={productImages[0].src}
                alt={productImages[0].alt}
                width={300}
                height={500}
                className="h-full w-full object-cover"
              />

              {/* Text overlay */}
              <div className="absolute inset-0 bg-black/30">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-1 text-center text-white px-2">
                    <h1 className="text-lg font-bold md:text-2xl">
                      {title}
                    </h1>
                    <h2 className="text-sm font-semibold md:text-lg">
                      FLASH SALE
                    </h2>
                    <p className="text-lg font-bold text-red-400 md:text-xl">
                      {discount}
                    </p>
                    <p className="text-xs md:text-sm">
                      All Sizes Available
                    </p>
                    <Link
                      href="/product-catalog"
                      className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 md:px-4 md:py-2 md:text-sm"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;