"use client"; // Marking this as a client component

import Image from "next/image";
import React from "react";

const UpdatesSection: React.FC = () => {
  return (
    <section className="bg-black padding-x padding-y">
      <div className="maxW text-left text-white">
        {/* Section Title */}
        <h6 className="smallHeading mb-2">Latest news and insights</h6>
        <h3 className="heading mb-12">
          Stay up-to-date on the latest ecommerce trends
        </h3>

        {/* Images and Content Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* First Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto p-4 w-full">
            <div
              className="h-full w-full absolute top-0 left-0 bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col h-full">
              <Image
                height={371}
                width={385}
                src="/Images/Updatepics/Updatepic1.png"
                alt="Marketing Automation"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="font-semibold text-white uppercase mb-4">
                Marketing Automation
              </h4>
              <p className="text-white">
                If implemented properly, automated marketing will let you:{" "}
                <br />
              </p>
              <ol className="list-decimal box-border ml-5">
                <li>Send out tailored emails to your customers.</li>
                <li>Display new products and promotions as ...</li>
              </ol>
            </div>
          </div>

          {/* Second Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto w-full p-4">
            <div
              className="h-full w-full absolute top-0 left-0 bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col h-full">
              <Image
                height={371}
                width={385}
                src="/Images/Updatepics/Updatepic2.png"
                alt="Subscription-Based Models"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-white">
                Subscription-Based <br className="hidden md:block" /> Models
                Will Rise
              </h4>
              <p className="text-gray-300">
                Digital payments are becoming convenient. We will see a rise in
                subscription-based business models in 2025. Companies like Loot
                Crate and BirchBox will see a ...
              </p>
            </div>
          </div>

          {/* Third Image with Background and Content */}
          <div className="relative flex flex-col gap-2 mx-auto w-full p-4">
            <div
              className="h-full w-full absolute top-0 left-0 bg-cover bg-center rounded-lg mx-auto"
              style={{ backgroundImage: 'url("/Images/Updatepics/Card.png")' }}
            ></div>
            <div className="relative flex flex-col h-full">
              <Image
                height={371}
                width={385}
                src="/Images/Updatepics/Updatepic3.png"
                alt="Chatbots"
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-white">
                Chatbots as Personal Assistants
              </h4>
              <p className="text-gray-300">
                We have been using chatbots for a few years now. But because of
                the use of neural networks now...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
