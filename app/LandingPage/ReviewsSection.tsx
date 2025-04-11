"use client";

import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";

// Testimonial data
const testimonials = [
  {
    name: "Kevin H.",
    business: "Music Instruments",
    rating: 5,
    imageUrl: "/Images/Landing/testifiers/1.jpg",
    quote:
      "Porpop has empowered me to take my small business to the next level. I'm now reaching customers all over the country, and I couldn't have done it without them.",
  },
  {
    name: "Jane D.",
    business: "Fashion Boutique",
    rating: 4,
    imageUrl: "/Images/Landing/testifiers/2.jpg",
    quote:
      "I was able to expand my reach and increase my sales dramatically. Highly recommend!",
  },
  {
    name: "Mike T.",
    business: "Tech Gadgets",
    rating: 5,
    imageUrl: "/Images/Landing/testifiers/3.jpg",
    quote:
      "Thanks to Porpop, my business is flourishing. I couldn't ask for better support!",
  },
  {
    name: "Sarah L.",
    business: "Fitness Coaching",
    rating: 5,
    imageUrl: "/Images/Landing/testifiers/4.jpg",
    quote:
      "My business grew exponentially after switching to Porpop. It's a game-changer.",
  },
  {
    name: "Tom B.",
    business: "Digital Marketing",
    rating: 4,
    imageUrl: "/Images/Landing/testifiers/1.jpg",
    quote:
      "The platform made it easier to track and manage my client base. Very efficient.",
  },
];

const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic carousel scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 5 seconds for auto-scroll

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigate to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Navigate to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className="bg-[#1E1E1E] py-16 padding-x padding-y w-screen overflow-hidden">
      <div className="maxW text-left text-white">
        <h2 className="heading mb-4">What our customers are saying</h2>
        <div className="md:flex justify-between mb-12 space-y-2">
          <p className="text-lg">Read why our customers love our platform</p>
          <p className="text-[#A4CD3A]">
            Businesses of every size are generating <br /> strong revenue
            through Porpop.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Testimonial Cards (showing 3 at once) */}
          <div className="flex gap-6 overflow-hidden">
            {testimonials
              .slice(currentIndex, currentIndex + 3)
              .map((testimonial, index) => (
                <div key={index} className="flex-none w-full sm:w-1/3">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
          </div>

          {/* Carousel Buttons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-4">
            <button
              onClick={prevTestimonial}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-4">
            <button
              onClick={nextTestimonial}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-12">
          <p className="text-lg text-white font-semibold mb-6">
            <span className="text-[#A4CD3A]">We&apos;re</span> always thrilled to hear Porpop has helped businesses thrive.
            Yours should be next!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
