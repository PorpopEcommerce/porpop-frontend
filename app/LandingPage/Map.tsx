import Image from "next/image";

const bgStyle = {
  backgroundImage: "url(Images/Landing/Map/map.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function Map() {
  return (
    <section className="md:px-12 padding-y">
      <div
        style={bgStyle}
        className="relative p-4 rounded-[10px] overflow-hidden"
      >
        <div className="h-full w-full bg-[#011B1C] opacity-50 absolute top-0 left-0 z-0" />
        <div className="maxW flex flex-wrap gap-10 xl:justify-between justify-center items-center relative z-10">
          <div className="flex lg:flex-col flex-wrap justify-center lg:justify-start gap-1">
            <Image
              src="/Images/Landing/Map/flags/flag-1.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-2.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-3.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-4.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-5.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-6.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
            <Image
              src="/Images/Landing/Map/flags/flag-7.png"
              className="rounded-[10px]"
              width={154}
              height={87}
              alt="flag"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-y-4 w-full md:w-auto">
            <Card image="/Images/Landing/Map/avatars/1.png" />
            <Card image="/Images/Landing/Map/avatars/2.png" scale />
            <Card image="/Images/Landing/Map/avatars/3.png" />
          </div>

          <Image
            src="/Images/Landing/Map/chart.png"
            alt="chart"
            width={359}
            height={465}
          />
        </div>
      </div>
    </section>
  );
}

const Card = ({ image, scale }: { image: string; scale?: boolean }) => {
  return (
    <div
      className={`bg-white rounded-[10px] p-4 space-y-4 w-full md:w-auto ${scale && "md:scale-x-125 md:scale-y-110"}`}
    >
      <Image
        src={image}
        width={153}
        height={216}
        className="rounded-[10px] w-full object-cover md:w-auto"
        alt="porpop"
      />
      <button className="bg-[#A4CD3A] text-sm text-white hover:bg-opacity-75 py-2 px-4 w-full rounded">
        Buy Now
      </button>
    </div>
  );
};
