import React from "react";

export default function GlobalReachSection() {
  return (
    <section className="bg-gray-100 py-20 px-8">
      {/* Centered Heading and Paragraph */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">We Have Introduced New Ways to<br /> Receive Funds Globally</h1>
        <p className="text-lg text-gray-700">
          Porpop is proud to announce its expansive reach to over 75 countries, now facilitating transactions
          in their respective local currencies. This advancement is poised to revolutionize the experience
          for vendors on Porpop, enhancing sales opportunities and streamlining transactions worldwide.
          With this global expansion, vendors can expect a significant boost in sales as accessibility and
          convenience are maximized for customers across diverse regions. Join us as we break barriers and unlock
          new horizons for e-commerce excellence with Porpop.
        </p>
      </div>

      {/* Layout with Circular Mockup and Boxes */}
      <div className="flex items-start justify-between mt-12">
        {/* Circular Mockup to the Left */}
        <div className="flex-1 max-w-sm relative mt-[5rem] ml-16">
          <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center">
            <p className="text-center text-gray-600">
              A circular mockup is suppose to be here.
            </p>
          </div>
        </div>

        {/* Boxes to the Right */}
        <div className="flex-1 grid grid-cols-2 gap-10 max-w-2xl ml-auto mt-10">
          {/* Box 1 */}
          <div className="p-10 bg-white rounded-lg shadow-md hover:bg-green-100 transition-colors h-[220px]">
            <h1 className="text-xl font-bold mb-2">70+</h1>
            <h3 className="text-md font-semibold mb-1">LOCAL CURRENCIES</h3>
            <p className="text-sm text-gray-700">
              Set and track currencies conversion on <br /> dashboard
            </p>
          </div>

          {/* Box 2 */}
          <div className="p-10 bg-white rounded-lg shadow-md hover:bg-green-100 transition-colors h-[220px]">
            <h1 className="text-xl font-bold mb-2">$7M+</h1>
            <h3 className="text-md font-semibold mb-1">REVENUE</h3>
            <p className="text-sm text-gray-700">
              Trusted by thousands of customers <br /> worldwide
            </p>
          </div>

          {/* Box 3 */}
          <div className="p-10 bg-white rounded-lg shadow-md hover:bg-green-100 transition-colors h-[220px]">
            <h1 className="text-xl font-bold mb-2">15M+</h1>
            <h3 className="text-md font-semibold mb-1">CUSTOMERS SERVED</h3>
            <p className="text-sm text-gray-700">
              Tested and Trusted
            </p>
          </div>

          {/* Box 4 */}
          <div className="p-10 bg-white rounded-lg shadow-md hover:bg-green-100 transition-colors h-[220px]">
            <h1 className="text-xl font-bold mb-2">400K+</h1>
            <h3 className="text-md font-semibold mb-1">VERIFIED SELLERS</h3>
            <p className="text-sm text-gray-700">
              Empowering the future wave of <br /> entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
