"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full border-4 border-white object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {name}, {business}
          </h3>

          {/* Rating stars */}
          <div className="flex mb-4 gap-1">
            {stars.map((filled, index) => (
              <FaStar
              key={index}
                className={
                  filled ? "text-black text-lg" : "text-gray-400 text-lg"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-600 border" />

      {/* Quote */}
      <div className="text-gray-600 flex gap-4">
        <FaQuoteLeft className="text-purple-800 text-4xl shrink-0" />
        <p>{quote}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
