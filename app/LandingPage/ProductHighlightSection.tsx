import React from 'react';
import Link from 'next/link';

type ProductData = {
  id: number;
  imagePlaceholder: string;
  headingSmall: string;
  headingLarge: string;
  description: JSX.Element | string;
  buttonText: string;
  buttonLink: string;
};

const data: ProductData[] = [
  {
    id: 1,
    imagePlaceholder: 'Product 1',
    headingSmall: 'MATERIAL MATTERS',
    headingLarge: 'GET QUALITY BAGS',
    description: (
      <>
        Bags made from durable material like leather, canvas high-quality
        synthetic fabric
      </>
    ),
    buttonText: 'View More',
    buttonLink: '/products/1',
  },
  {
    id: 2,
    imagePlaceholder: 'Product 2',
    headingSmall: 'CHECKOUT',
    headingLarge: 'PREMIUM T-SHIRTS',
    description:
      'Looking for T-shirts made from high-quality materials like 100%',
    buttonText: 'SHOP NOW',
    buttonLink: '/products/2',
  },
];

export default function ProductHighlightSection() {
  return (
    <section className="bg-gray-100 py-20 px-8">
      <div className="grid grid-cols-2 gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex items-center space-x-6 p-6">
            {/* Image Placeholder */}
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-md">
              <p className="text-gray-500">{item.imagePlaceholder}</p>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {item.headingSmall}
              </h3>
              <h2 className="text-2xl font-bold mb-3">{item.headingLarge}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <Link
                href={item.buttonLink}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
