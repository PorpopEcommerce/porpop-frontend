"use client"
import React from 'react';

interface TestimonialCardProps {
  name: string;
  business: string;
  rating: number; // The rating will be a number from 1 to 5
  imageUrl: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  business,
  rating,
  imageUrl,
  quote,
}) => {
  // Create an array of stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg max-w-sm w-full">
      <div className="flex items-center mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full border-4 border-white"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-200">{business}</p>
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex mb-4">
        {stars.map((filled, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 15.27l4.62 2.43-1.18-5.15 3.92-3.83-5.18-.45L10 0 7.62 8.27 2.44 9.72l3.92 3.83-1.18 5.15L10 15.27z"
            />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <div className="text-white text-lg italic">
        <span className="font-bold text-purple-200">“</span>
        {quote}
        <span className="font-bold text-purple-200">”</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
