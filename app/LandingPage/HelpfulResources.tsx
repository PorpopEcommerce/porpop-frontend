const data = [
  {
    id: 1,
    title: "Learning & Community",
    body: "Free community resources to help you jumpstart your online store.",
    img: "/Images/HelpfulResources/1.png",
  },
  {
    id: 2,
    title: "Guides & Videos",
    body: "Explore our library of educational resources for ecommerce industry insights, expert tips, success strategies and more.",
    img: "/Images/HelpfulResources/2.png",
  },
];

export default function HelpfulResources() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW space-y-6">
        <div className="space-y-2">
          <h5 className="smallHeading">Get the help you need</h5>
          <h2 className="heading">
            Find helpful resources to help you{" "}
            <br className="hidden md:block" /> get started.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              body={item.body}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  body,
  img,
}: {
  title: string;
  body: string;
  img: string;
}) => {
  const bgStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="rounded-[10px] relative overflow-hidden h-80 flex items-end px-4"
      style={bgStyle}
    >
      <div className="h-full w-full bg-[#011B1C] opacity-70 absolute top-0 left-0 z-0" />

      <div className="text-white relative z-10 lg:w-4/5 xl:w-3/5 pb-4 h-28">
        <h2 className="font-medium text-2xl mb-2">{title}</h2>
        <p className="text-sm">{body}</p>
      </div>
    </div>
  );
};
