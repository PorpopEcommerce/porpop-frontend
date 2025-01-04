import Image from "next/image";

export default function ChoosePlan() {
  return (
    <section className="bg-black padding-y padding-x text-white">
      <div className="maxW space-y-8">
        <h5 className="text-sm text-[#006B6E]">Pricing Plans</h5>
        <div className="md:flex justify-between items-center space-y-2">
          <h2 className="heading">Choose the plan that's right for you</h2>

          <p className="text-[#006B6E] text-lg">
            We offer a variety of pricing plans to{" "}
            <br className="hidden lg:block" /> fit your needs.
          </p>
        </div>

        <div className="bg-[#006B6E] rounded-[10px] p-4 flex justify-center w-full relative">
          <div className="flex lg:justify-end justify-center lg:w-[50%] w-full">
            <div className="relative w-full md:flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-[#D9D9D9] rounded-[10px] h-[400px] md:w-[400px] w-full" />
                <div className="bg-[#C3C3C3] rounded-[10px] h-[300px] w-[275px] absolute top-[50px] -left-[200px] hidden lg:block" />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 h-full lg:flex items-center hidden">
            <Image
              src="/Images/Landing/paypal.png"
              alt="paypal"
              height={107}
              width={220}
              className="rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
