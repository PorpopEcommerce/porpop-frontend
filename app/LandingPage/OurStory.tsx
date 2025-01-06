import Image from "next/image";

export default function OurStory() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW space-y-6">
        <div className="space-y-2">
          <h5 className="smallHeading">Our story</h5>
          <h2 className="heading">
            We're passionate about helping <br className="hidden md:block" />{" "}
            businesses succeed online.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="md:col-span-6 rounded-[10px] overflow-hidden p-4 bg-[#011B1C] bg-opacity-70">
            <Image
              src="/Images/Landing/ourstory.png"
              width={603}
              height={348}
              className="w-full h-auto rounded-[10px]"
              alt="Our story"
            />

            <div className="text-white relative z-10 mt-4">
              <h2 className="font-medium text-2xl mb-2">About Porpop</h2>
              <p className="">
                Today, countless entrepreneurs and established businesses trust
                Porpop to power their online sales.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 bg-[#011B1C] bg-opacity-70 p-4 text-white lg:text-2xl text-xl text-center flex items-center">
            Porpop was created to connect buyers and sellers in a vibrant online
            marketplace. We achieve this by providing a robust multi-vendor
            platform with all the tools necessary for managing products, orders,
            and customer relationships.
          </div>
        </div>
      </div>
    </section>
  );
}
