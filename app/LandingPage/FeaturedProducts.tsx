import Image from "next/image";

export default function FeaturedProducts() {
  return (
    <section className="padding-y padding-x">
      <div className="maxW space-y-8">
        <h2 className="heading text-center text-white">
          See featured products
        </h2>

        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4">
          <Image
            src="/Images/Landing/Products/1.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/2.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/3.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/4.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/5.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/6.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/7.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/8.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/9.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/10.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/11.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/12.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/13.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/14.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/15.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/16.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/17.png"
            alt="product"
            width={195}
            height={130}
          />
          <Image
            src="/Images/Landing/Products/18.png"
            alt="product"
            width={195}
            height={130}
          />
        </div>

        <div className="text-center">
          <button className="bg-[#A4CD3A] hover:bg-opacity-75 rounded py-3 px-10 text-[#006B6E] font-semibold">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
