import Image from "next/image";

const bgStyle = {
  backgroundImage: "url(Images/Landing/people-connected.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function CTO() {
  return (
    <section className="padding-x padding-y text-white">
      <div className="md:w-96 mx-auto space-y-4 mb-8">
        <h2 className="heading text-center">
          Sell here, there, and everywhere
        </h2>
        <p className="text-sm text-center">
          Build a beautiful, high-converting online store. Choose our
          multi-vendor platform for a fast launch or build a unique store from
          scratch.
        </p>
      </div>

      <div className="py-4" style={bgStyle}>
        <div className="flex justify-center">
          <Image
            src="/Images/Landing/devices.png"
            height={746}
            width={592}
            alt="devices"
          />
        </div>

        <div className="flex flex-col gap-4 items-center mt-6">
          <p className="text-xl text-center md:text-start">
            There&apos;s no better place for your to build
          </p>
          <button className="bg-[#A4CD3A] hover:bg-opacity-75 rounded py-3 px-10 text-[#006B6E] font-semibold">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
