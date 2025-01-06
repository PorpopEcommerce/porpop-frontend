import Image from "next/image";
import Link from "next/link";
import { FaGlobe, FaFacebook, FaPinterest } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { RxCaretDown } from "react-icons/rx";

export default function Footer() {
  return (
    <footer className="padding-y padding-x">
      <div className="maxW space-y-8 mt-10 text-white">
        <div className="grid lg:grid-cols-12 gap-x-4 gap-y-8">
          <div className="col-span-4">
            <Image src="/Images/logo.png" alt="logo" width={200} height={52} />
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-3 gap-x-4 gap-y-10">
              <div>
                <ul className="space-y-2">
                  <li className="text-lg font-bold">Need Help?</li>
                  <li className="hover:text-gray-300"><Link href="#">Chat with us</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Help Center</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2">
                  <li className="text-lg font-bold">Useful Links</li>
                  <li className="hover:text-gray-300"><Link href="#">Free shipping</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Carrier information</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Online payment is 100% safe</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Free returns track or cancel orders</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">How to shop on Porpop?</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">How to sell on Porpop</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Delivery options and timelines</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">How to return a product on Propop?</Link></li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2">
                  <li className="text-lg font-bold">Resources</li>
                  <li className="hover:text-gray-300"><Link href="#">Blog</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Newsletter</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">Jobs</Link></li>
                  <li className="hover:text-gray-300"><Link href="#">About</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <FaGlobe className="text-white" />
              <p className="uppercase text-lg">usa</p>
              <RxCaretDown />
            </div>

            <ul className="flex gap-8 items-center">
              <li className="hover:text-gray-300"><Link href="#">Terms of Service</Link></li>
              <li className="hover:text-gray-300"><Link href="#">Privacy Policy</Link></li>
              <li className="hover:text-gray-300"><Link href="#">Sitemap</Link></li>
            </ul>

            <div className="w-[200px] space-y-4">
              <div className="flex justify-between items-center">
                <FaFacebook fontSize="36px" className="cursor-pointer hover:text-gray-300 transitionItem" />
                <FaPinterest fontSize="36px" className="cursor-pointer hover:text-gray-300 transitionItem" />
                <FaSquareInstagram fontSize="36px" className="cursor-pointer hover:text-gray-300 transitionItem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
