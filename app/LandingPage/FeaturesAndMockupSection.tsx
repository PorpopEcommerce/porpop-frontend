import React from 'react';
import Link from 'next/link';

export default function FeaturesAndMockupSection() {
  return (
    <section className="bg-white py-16 px-8">
      <div className="grid grid-cols-2 gap-8 items-center">
        {/* Top-left Content */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">Build your ONLINE STORE with ease</h1>
          <p className="text-gray-700">
          Create your professional store effortlessly with Porpop’s prebuilt platform.
          Vendors experience minimal stress, making the store setup process exciting and seamless.
          </p>
          <Link
            href="/explore"
            className="mt-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-fit"
          >
            Get Started
          </Link>
        </div>

        {/* Top-right Mockup */}
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mockup Image</p>
          </div>
        </div>

        {/* Bottom-left Mockup */}
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mockup Image</p>
          </div>
        </div>

        {/* Bottom-right Content */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">Receive PAYMENT with Google Pay</h1>
          <p className="text-gray-700">
          Introducing Google Pay payment options for vendors, expanding payment flexibility and embracing digital
          payment trends for enhanced transactions and financial inclusivity in the marketplace
          </p>
          <Link
            href="/opportunities"
            className="mt-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition w-fit"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </section>
  );
}
