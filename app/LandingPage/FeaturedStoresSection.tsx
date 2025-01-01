// components/FeaturedStoresSection.tsx
import React from 'react';

const FeaturedStoresSection: React.FC = () => {
  return (
    <section className="bg-[#1E1E1E] py-16 px-6">
      <div className="text-left text-white">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-4">See what's possible</h2>
        
        {/* Paragraph */}
        <p className="text-lg mb-12">
          Check out some of the amazing stores that have been created using our platform.
        </p>

        {/* Image Links Section */}
        <div className="flex gap-6">
          {/* First Image (Storepic1) */}
          <a href="https://store1.com" className="block">
            <img
              src="/Images/FeaturedStores/Storepic1.png"
              alt="Store 1"
              className="w-[513px] h-[335px] rounded-[10px] transition-transform transform hover:scale-105"
            />
          </a>
          
          {/* Second Image (Storepic2) */}
          <a href="https://store2.com" className="block">
            <img
              src="/Images/FeaturedStores/Storepic2.png"
              alt="Store 2"
              className="w-[201px] h-[335px] rounded-[10px] transition-transform transform hover:scale-105"
            />
          </a>
          
          {/* Third Image (Storepic3) */}
          <a href="https://store3.com" className="block">
            <img
              src="/Images/FeaturedStores/Storepic3.png"
              alt="Store 3"
              className="w-[513px] h-[335px] rounded-[10px] transition-transform transform hover:scale-105"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoresSection;
