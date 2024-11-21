import React from 'react';

type CardData = {
  id: number;
  iconPlaceholder: string;
  title: string;
  description: string;
  buttonText: string;
};

const data: CardData[] = [
  {
    id: 1,
    iconPlaceholder: 'Icon 1',
    title: 'CREATE A STORE',
    description: `Create a standout mobile-friendly store effortlessly with our prebuilt
    solution. No stress, just results. Engage customers seamlessly on any
    device and boost your online presence in less than five minute!`,
    buttonText: 'SIGN UP',
  },
  {
    id: 2,
    iconPlaceholder: 'Icon 2',
    title: 'GET FREE TRAFFIC',
    description: `Using SEO (Search Engine Optimization) features is crucial for
    reaching a wider audience online.Utilize the built-in SEO feature to
    expand your reach and connect with a broader audience. Optimize
    your product to enhance visibility and attract more visitors to your
    store effectively.`,
    buttonText: 'CLICK ME',
  },
  {
    id: 3,
    iconPlaceholder: 'Icon 3',
    title: 'TARGET SALES',
    description: `Select the specific geographic area where you want to focus your
    sales efforts and receive targeted customer engagement,
    maximizing engagementand conversion rates. Achieve focused
    sales growth by directing efforts towards regions with high
    potential, ensuring optimal return on investment.`,
    buttonText: 'CLICK ME',
  },
];

export default function ThreeStepProcessSection() {
  return (
    <section className="bg-white py-20 px-8">
      {/* Headers */}
      <div className="text-center mb-12">
        <h5 className="text-lg font-semibold text-gray-600 mb-2">
          READY TO TAKE YOUR BUSINESS ONLINE?
        </h5>
        <div className="relative">
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 border-t border-gray-300"></div>
          <h6 className="text-2xl font-bold relative bg-white px-4 inline-block">
            3 SIMPLE STEPS TO START RECEIVING SALES GLOBALLY
          </h6>
        </div>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-500 transition-shadow flex flex-col items-center"
          >
            {/* Icon Placeholder */}
            <div className="w-14 h-14 bg-gray-300 flex items-center justify-center rounded-full mb-3">
              <p className="text-gray-500">{item.iconPlaceholder}</p>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700 text-center mb-4 text-sm">{item.description}</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              {item.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
