'use client';

import React from 'react';
import Link from 'next/link';

export default function TenthSection() {
  return (
    <footer className="bg-green-600 text-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Main Columns and Available On Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 items-start mb-8">
        {/* First Column */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Men's Wear
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Women's Wear
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Kids' Wear
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Second Column */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Order Tracking
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Third Column */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Press
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Affiliate Program
              </Link>
            </li>
          </ul>
        </div>

        {/* Available On Section */}
        <div>
          <p className="text-sm lg:text-base font-semibold mb-2">Available on</p>
          <div className="flex space-x-4 mb-4">
            <div className="bg-gray-800 w-20 h-8 sm:w-24 sm:h-10 rounded flex items-center justify-center">
              <p className="text-sm sm:text-base text-white">App Store</p>
            </div>
            <div className="bg-gray-800 w-24 h-8 sm:w-28 sm:h-10 rounded flex items-center justify-center">
              <p className="text-sm sm:text-base text-white">Google Play</p>
            </div>
          </div>
          <p className="text-sm">Join our newsletter</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center gap-6 items-start text-sm mb-8">
        {/* Payment System */}
        <div className="text-center">
          <h4 className="font-bold mb-2">Payment System</h4>
          <div className="bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto flex items-center justify-center">
            <p className="text-white">💳</p>
          </div>
        </div>

        {/* Shipping System */}
        <div className="text-center">
          <h4 className="font-bold mb-2">Shipping System</h4>
          <div className="bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto flex items-center justify-center">
            <p className="text-white">🚚</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h4 className="font-bold mb-2">Our Social Links</h4>
          <div className="bg-gray-800 w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto flex items-center justify-center">
            <p className="text-white">🌐</p>
          </div>
        </div>
      </div>

      {/* Divider and Footer Note */}
      <div className="border-t border-gray-500 pt-4 text-center">
        <p className="text-sm">
          Porpop 2023. Multinational E-commerce marketplace.
        </p>
      </div>
    </footer>
  );
}
