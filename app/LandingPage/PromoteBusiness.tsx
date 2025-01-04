import Image from "next/image";

const data = [
  {
    id: 1,
    title: "Grow your audience",
    body: "Grow your audience organically with integrated SEO and social media features.",
  },
  {
    id: 2,
    title: "Engage with customers",
    body: "Create email campaigns that reinforce your brand identity with consistent colors, product showcases, and integrated blog content.",
  },
  {
    id: 3,
    title: "Optimize with analytics",
    body: "Make data-driven decisions with insights into your website traffic, customer behavior, and store performance.",
  },
];

export default function PromoteBusiness() {
  return (
    <section className="padding-x padding-y">
      <div className="maxW md:mb-4">
        <h2 className="heading">Promote your business</h2>
        <p className="text-sm text-white mt-4">
          We&apos;re here to answer your questions.
        </p>

        <div className="grid xl:grid-cols-10 grid-cols-1 gap-x-4 gap-y-10 mt-8">
          <div className="xl:col-span-5 space-y-6">
            {data.map((item) => (
              <Item key={item.id} title={item.title} body={item.body} />
            ))}
          </div>

          <div className="xl:col-span-5 flex">
            <div className="relative">
            <Image src="/Images/Landing/promote_business.png" alt="minimal setup" height={658} width={729} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Item = ({ title, body }: { title: string; body: string }) => {
  return (
    <div className="border-l-2 border-[#A4CD3A] px-4 text-white space-y-4 md:w-3/4">
      <h2 className="heading">{title}</h2>
      <p>{body}</p>
    </div>
  );
};
