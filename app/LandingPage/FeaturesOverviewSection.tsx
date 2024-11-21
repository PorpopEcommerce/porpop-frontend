import React from 'react';

export default function FeaturesOverviewSection() {
  return (
    <section className="bg-white py-16 px-8">
      {/* Centered Headings */}
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold text-gray-600">THERE ARE MANY VARIATIONS</h3>
        <h3 className="text-4xl font-bold">All-in-one mobile app for managing your<br /> sales</h3>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Content Item 1 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <p className="text-gray-500">Icon</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Account management</h4>
              <p className="text-gray-700">
              Control your entire marketplace from your mobile app
              </p>
            </div>
          </div>

          {/* Content Item 2 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <p className="text-gray-500">Icon</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Recurring purchases</h4>
              <p className="text-gray-700">
              Let your customers pay you recurrently
              </p>
            </div>
          </div>

          {/* Content Item 3 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <p className="text-gray-500">Icon</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Funds protection</h4>
              <p className="text-gray-700">
              we take security seriously so every payment made on our<br /> platform is 100% secure, even exceeding industry standard.
              </p>
            </div>
          </div>

          {/* Content Item 4 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <p className="text-gray-500">Icon</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Mobile application</h4>
              <p className="text-gray-700">
              Porpop has popularised the adoption of its mobile app by<br />
              offering app-exclusive discounts and deals to its customers;<br />
              particularly, the first-time app users are given a sizeable<br />
              discount
              </p>
            </div>
          </div>
        </div>

        {/* Right Mockup */}
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mockup Image</p>
          </div>
        </div>
      </div>
    </section>
  );
}
