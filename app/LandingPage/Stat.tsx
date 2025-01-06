import Image from "next/image";

const data = [
  {
    id: 1,
    title: "Higher conversions",
    value: 21,
  },
  {
    id: 2,
    title: "High-intent shoppers",
    value: 87,
  },
];

export default function Stat() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW grid xl:grid-cols-2 gap-x-4 gap-y-8 text-white">
        <div className="space-y-8">
          <h4 className="text-3xl font-light max-w-[600px]">
            The easiest checkout for your customers, and more sales for you.
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {data.map((item) => (
              <EachStat key={item.id} title={item.title} value={item.value} />
            ))}
          </div>

          <div className="border-l-2 border-[#A4CD3A] px-4 text-white space-y-4 md:w-3/4">
            <h2 className="text-2xl">Stop losing sales!</h2>
            <p>
              Porpop Checkout drives 21% higher conversions on average and
              connects your brand with buy-ready shoppers.
            </p>
          </div>
        </div>

        <div className="flex md:justify-end justify-center items-center">
          <div className="relative">
            <Image
              src="/Images/Landing/scanhere.png"
              alt="scan here"
              height={442}
              width={405}
            />
            <Image
              src="/Images/Landing/onlinepayment.png"
              alt="online payment"
              height={360}
              width={300}
              className="absolute -bottom-12 -left-[250px] hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const EachStat = ({ title, value }: { title: string; value: number }) => {
  return (
    <div>
      <p className="smallHeading">{title}</p>
      <h1 className="text-6xl">{value}%</h1>
    </div>
  );
};
