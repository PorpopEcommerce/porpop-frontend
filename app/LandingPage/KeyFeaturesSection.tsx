import React from 'react';
import Link from 'next/link';

type SectionData = {
  id: number;
  title: string;
  description: string;
  button: { label: string; href: string };
};

const data: SectionData[] = [
  {
    id: 1,
    title: 'Create an Online Store',
    description: 'Craft an exceptional, mobile-responsive store for showcasing your product, optimizing accessibility and engagement for diverse audiences on handheld devices',
    button: { label: 'SIGN UP', href: '/products' },
  },
  {
    id: 2,
    title: 'Upgrade to Activate Store',
    description: 'Select a package and activate your store to unlock its full potential, kickstarting your online business journey with ease and efficiency',
    button: { label: 'PRICING PLAN', href: '/vendor/signup' },
  },
  {
    id: 3,
    title: 'Sell Globally',
    description: 'Porpop elevates vendors’ merchandise, broadening their reach to a global audience, facilitating global sales and expanding market presence effectively',
    button: { label: 'LEARN MORE', href: '/support' },
  },
];

export default function KeyFeaturesSection() {
  return (
    <section className="bg-white py-16 px-8 mt-[-1rem]">
      <div className="lg:flex lg:justify-between space-x-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex-1 p-8 rounded-lg shadow-md text-center flex flex-col justify-between items-center"
          >
            <div className="text-6xl font-bold text-green-500 mb-4">{item.id}</div>
            <div>
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            
            <p className="text-gray-700 mb-6">{item.description}</p>
            </div>
            
            
            
            <Link
              href={item.button.href}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {item.button.label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
