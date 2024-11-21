import React, { useEffect, useState } from 'react';

type ReviewData = {
  id: number;
  businessName: string;
  address: string;
  phone: string;
  stars: number;
  reviewsCount: string;
  placeholderImage: string;
};

const reviews: ReviewData[] = [
  { id: 1, businessName: 'Vendor A', address: '123 Street, City', phone: '+1234567890', stars: 5, reviewsCount: '5.00 (10 reviews)', placeholderImage: 'A' },
  { id: 2, businessName: 'Vendor B', address: '456 Avenue, City', phone: '+2345678901', stars: 4, reviewsCount: '4.50 (8 reviews)', placeholderImage: 'B' },
  { id: 3, businessName: 'Vendor C', address: '789 Boulevard, City', phone: '+3456789012', stars: 3, reviewsCount: '3.00 (5 reviews)', placeholderImage: 'C' },
  { id: 4, businessName: 'Vendor D', address: '101 Circle, City', phone: '+4567890123', stars: 4, reviewsCount: '4.00 (12 reviews)', placeholderImage: 'D' },
  { id: 5, businessName: 'Vendor E', address: '202 Square, City', phone: '+5678901234', stars: 5, reviewsCount: '5.00 (20 reviews)', placeholderImage: 'E' },
  { id: 6, businessName: 'Vendor F', address: '303 Triangle, City', phone: '+6789012345', stars: 2, reviewsCount: '2.00 (3 reviews)', placeholderImage: 'F' },
  { id: 7, businessName: 'Vendor G', address: '404 Pentagon, City', phone: '+7890123456', stars: 3, reviewsCount: '3.50 (6 reviews)', placeholderImage: 'G' },
  { id: 8, businessName: 'Vendor H', address: '505 Hexagon, City', phone: '+8901234567', stars: 5, reviewsCount: '5.00 (15 reviews)', placeholderImage: 'H' },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-gray-100 py-8 overflow-hidden w-screen">
      <div className="w-full mx-auto relative flex items-center">
        
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold p-2 rounded-full z-10"
        >
          ❮
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[300px] h-[180px] bg-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400 transition-shadow p-4 relative flex-shrink-0 mx-4"
              >
                <h3 className="text-lg font-semibold">{review.businessName}</h3>
                <p className="text-gray-600">{review.address}</p>
                <p className="text-gray-600">{review.phone}</p>

                {/* Stars */}
                <div className="flex items-center my-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < review.stars
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500">{review.reviewsCount}</p>

                {/* Vendor Image */}
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center absolute bottom-2 right-2">
                  <p className="text-gray-500 text-xl font-bold">{review.placeholderImage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold p-2 rounded-full z-10"
        >
          ❯
        </button>
      </div>
    </section>
  );
}
