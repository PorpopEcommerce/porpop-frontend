const bgStyle = {
  backgroundImage: "url(Images/Landing/globe.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function Advantages() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW relative" style={bgStyle}>
        <div className="h-full w-full bg-[#255200] opacity-80 absolute top-0 left-0 z-0" />
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 text-white h-[450px] p-8 relative z-10">
          <div className="hidden md:block">
            <h2 className="heading">Reliable and lightning-fast</h2>
          </div>
          <div className="flex md:items-end md:justify-end items-center justify-center">
            <div className="space-y-2">
              <h2 className="heading">Built for stability and speed</h2>
              <p className="text-sm">
                Porpop delivers your store to global shoppers in <br /> under 50
                milliseconds and is built to handle even <br /> the most
                significant product launches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
