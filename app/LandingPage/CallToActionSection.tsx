import React from 'react';

export default function CallToActionSection() {
  return (
    <section className="bg-white py-16 px-8">
      <div className="grid grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h4 className="text-lg font-semibold text-gray-600 mb-2">ARE YOU READY TO</h4>
          <h3 className="text-3xl font-bold mb-4">
            Start up your dream <br /> online business?
          </h3>
          <p className="text-gray-700 mb-6">
            Our standout features is its commitment to fair pricing. Our platform
            offers competitive fees for sellers, ensuring that they can maximize
            their profits without hidden costs.
          </p>
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            SIGN UP
          </button>
        </div>

        {/* Right Video Placeholder */}
        <div className="flex justify-center items-center bg-gray-300 w-full h-64 rounded-lg">
          <p className="text-gray-500">YouTube Video Placeholder</p>
        </div>
      </div>
    </section>
  );
}
