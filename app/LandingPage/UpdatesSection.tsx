'use client'; // Marking this as a client component

import React from 'react';

const UpdatesSection: React.FC = () => {
  return (
    <section className="bg-[#1E1E1E] py-16 px-6">
      <div className="text-left text-white">
        {/* Section Title */}
        <h6 className="text-lg font-semibold mb-2">Latest news and insights</h6>
        <h3 className="text-3xl font-bold mb-12">Stay up-to-date on the latest ecommerce trends</h3>

        {/* Images and Content Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
          {/* First Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto -translate-y-[100px]">
            <div
              className="h-[600px] w-[70%] bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col justify-center items-center h-full">
              <img
                src="/Images/Updatepics/Updatepic1.png"
                alt="Ecommerce Trend 1"
                className="w-[250px] h-auto rounded-lg mb-4 transform translate-y-[-50px]"
              />
              <h4 className="text-xl font-semibold text-white">Ecommerce Trend 1</h4>
              <p className="text-gray-300 text-center">
                Description of the first ecommerce trend and its impact on the market.
              </p>
            </div>
          </div>

          {/* Second Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto -translate-y-[100px]">
            <div
              className="h-[600px] w-[70%] bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col justify-center items-center h-full">
              <img
                src="/Images/Updatepics/Updatepic2.png"
                alt="Ecommerce Trend 2"
                className="w-[250px] h-auto rounded-lg mb-4 transform translate-y-[-50px]"
              />
              <h4 className="text-xl font-semibold text-white">Ecommerce Trend 2</h4>
              <p className="text-gray-300 text-center">
                A deep dive into how this trend is shaping the future of online retail.
              </p>
            </div>
          </div>

          {/* Third Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto -translate-y-[100px]">
            <div
              className="h-[600px] w-[70%] bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col justify-center items-center h-full">
              <img
                src="/Images/Updatepics/Updatepic3.png"
                alt="Ecommerce Trend 3"
                className="w-[250px] h-auto rounded-lg mb-4 transform translate-y-[-50px]"
              />
              <h4 className="text-xl font-semibold text-white">Ecommerce Trend 3</h4>
              <p className="text-gray-300 text-center">
                Exploring the rise of mobile commerce and its advantages for businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
