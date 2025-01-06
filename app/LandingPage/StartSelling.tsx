import Image from "next/image";

const data = [
  {
    id: 1,
    text: "Create an Online Store",
  },
  {
    id: 2,
    text: "Activate your store",
  },
  {
    id: 3,
    text: "Sell Globally",
  },
];

export default function StartSelling() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW space-y-8">
        <h2 className="heading md:text-center lg:text-start">
          Start selling with minimal setup.
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="md:flex lg:block justify-center">
            <Image src="/Images/Landing/minimal_setup.png" alt="minimal setup" height={558} width={615} />
          </div>
          <div className="flex items-center justify-center">
            <div className="space-y-6">
              {data.map((item) => (
                <Item key={item.id} id={item.id} text={item.text} />
              ))}

              <div className="text-center">
                <button className="bg-[#A4CD3A] hover:bg-opacity-75 rounded py-3 px-10 text-[#006B6E] font-semibold">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Item = ({ id, text }: { id: number; text: string }) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl text-[#A4CD3A] font-medium">0{id}</h2>
      <h2 className="w-full text-2xl text-white font-medium pb-2 border-b-2 border-[#A4CD3A]">
        {text}
      </h2>
    </div>
  );
};
