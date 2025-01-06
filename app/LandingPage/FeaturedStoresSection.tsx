// components/FeaturedStoresSection.tsx
import React from "react";

const FeaturedStoresSection: React.FC = () => {
  return (
    <section className="bg-black padding-x padding-y rounded-t-[20px] -mt-[20px] relative">
      <div className="text-left text-white maxW">
        {/* Heading */}
        <h2 className="heading mb-4">See what&apos;s possible</h2>

        {/* Paragraph */}
        <p className="mb-12">
          Check out some of the amazing stores that have been created using our
          platform.
        </p>

        {/* Image Links Section */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* First Image (Storepic1) */}
          <a href="https://store1.com" className="block md:col-span-5">
            <img
              src="/Images/FeaturedStores/Storepic1.png"
              alt="Store 1"
              className="w-full h-auto max-h-[360px] rounded-[10px] transition-transform transform hover:scale-105"
            />
          </a>

          {/* Second Image (Storepic2) */}
          <a href="https://store2.com" className="block md:col-span-2">
            <img
              src="/Images/FeaturedStores/Storepic2.png"
              alt="Store 2"
              className="w-full h-full max-h-[360px] rounded-[10px] transition-transform transform hover:scale-105 object-cover object-center"
            />
          </a>

          {/* Third Image (Storepic3) */}
          <a href="https://store3.com" className="block md:col-span-5">
            <img
              src="/Images/FeaturedStores/Storepic3.png"
              alt="Store 3"
              className="w-full h-auto max-h-[360px] rounded-[10px] transition-transform transform hover:scale-105"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStoresSection;
