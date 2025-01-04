import Image from "next/image";

export default function Support() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW space-y-8">
        <h2 className="heading">Porpop provides the support you need.</h2>

        <p className="md:w-[500px] w-full text-white">
          We are your partner in growth, helping you expand your team, boost
          your marketing, and keep your bestsellers in stock.
        </p>

        <div className="grid md:grid-cols-12 gap-4 text-white">
          <div className="md:col-span-8">
            <div className="bg-[#011B1C] rounded-[10px] px-4 py-10">
              <div className="grid grid-cols-3">
                <Image
                  src="/Images/Landing/Support/1.png"
                  alt="feature"
                  width={242}
                  height={236}
                />
                <Image
                  src="/Images/Landing/Support/2.png"
                  alt="feature"
                  width={242}
                  height={236}
                  className="scale-y-110 scale-x-125"
                />
                <Image
                  src="/Images/Landing/Support/3.png"
                  alt="feature"
                  width={242}
                  height={236}
                />
              </div>

              <h2 className="heading mt-10">
                Porpop keeps you at the cutting edge
              </h2>
              <p>
                we take security seriously so every payment made on our platform{" "}
                <br /> is 100% secure, even exceeding industry standard.
              </p>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-[#011B1C] p-4 h-full rounded-[10px]">
              <Image
                src="/Images/Landing/automate.png"
                width={333}
                height={276}
                alt="automate you business"
                className="mx-auto"
              />

              <h2 className="text-3xl text-center mt-6">Automation</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
