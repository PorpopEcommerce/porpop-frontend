"use client";

import Badge from "@/components/dashboard/Badge";
import Header from "@/components/dashboard/ecommerce/orders/details/Header";
import Section from "@/components/dashboard/Section";
import { FaCalendar, FaTrophy } from "react-icons/fa";
import {
  MdEdit,
  MdEmail,
  MdLocationOn,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import {
  TbCreditCardFilled,
  TbFileInvoice,
  TbShoppingCartCheck,
  TbTruck,
} from "react-icons/tb";
import { RiUserFill } from "react-icons/ri";
import { BiSolidTimer } from "react-icons/bi";
import { BsFillBackpack4Fill } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import Table from "@/components/dashboard/ecommerce/orders/details/Table";

export default function OrderDetails() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid lg:grid-cols-2 gap-4 text-white">
            <Section>
              <div className="flex justify-between gap-4 items-center mb-6">
                <div className="flex items-center gap-4">
                  <h4 className="text-white text-lg">Order #302022</h4>
                  <Badge variant="lowStock" text="Processing" />
                </div>
                <div>
                  <MdEdit className="text-lg" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <TbTruck className="text-xl" />
                    </div>
                    <p className="text-white">Added</p>
                  </div>

                  <p className="text-white">23 Dec 2022</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <TbCreditCardFilled className="text-xl" />
                    </div>
                    <p className="text-white">Payment Method</p>
                  </div>

                  <p className="text-white">Visa</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <FaCalendar className="text-xl" />
                    </div>
                    <p className="text-white">Shipping Method</p>
                  </div>

                  <p className="text-white">Flat Shipping</p>
                </div>
              </div>
            </Section>

            <Section>
              <div className="flex justify-between gap-4 items-center mb-6">
                <h4 className="text-white text-lg">Customer</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <RiUserFill className="text-xl" />
                    </div>
                    <p className="text-white">Customer</p>
                  </div>

                  <p className="text-white">Josh Adam</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <MdEmail className="text-xl" />
                    </div>
                    <p className="text-white">Email</p>
                  </div>

                  <p className="text-white">joshadam@gmail.com</p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <MdOutlinePhoneAndroid className="text-xl" />
                    </div>
                    <p className="text-white">Phone</p>
                  </div>

                  <p className="text-white">909 427 2920</p>
                </div>
              </div>
            </Section>
          </div>

          <section className="bg-dark-600 rounded-lg shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-200 text-sm py-4">
            <div className="flex items-center gap-2 mb-4 px-4">
              <h3 className="text-white text-lg">Order List</h3>
              <Badge variant="delivered" text="+2 Orders" />
            </div>

            <div>
              <Table />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Section>
            <div className="flex justify-between gap-4 items-center mb-6 text-white">
              <h4 className="text-white text-lg">Document</h4>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dark-400">
                    <TbFileInvoice className="text-xl" />
                  </div>
                  <p className="text-white">Invoice</p>
                </div>

                <p className="text-white">INV32022</p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dark-400">
                    <TbTruck className="text-xl" />
                  </div>
                  <p className="text-white">Shipping</p>
                </div>

                <p className="text-white">SHP-2022REG</p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-dark-400">
                    <FaTrophy className="text-xl" />
                  </div>
                  <p className="text-white">Rewards</p>
                </div>

                <p className="text-white">480 points</p>
              </div>
            </div>
          </Section>

          <Section>
            <div className="flex justify-between gap-4 items-center mb-6">
              <h4 className="text-white text-lg">Address</h4>
            </div>

            <div className="space-y-3">
              <div className="">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-dark-400">
                    <MdLocationOn className="text-xl" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-grey-200">Billing Address</p>
                    <p className="text-white">
                      2833 Bel Meadow Drive, Fontana, California 92335, USA
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-dark-400">
                    <MdLocationOn className="text-xl" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-grey-200">Shipping Address</p>
                    <p className="text-white">
                      2833 Bel Meadow Drive, Fontana, California 92335, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className="flex justify-between gap-4 items-center mb-6">
              <h4 className="text-white text-lg">Order Status</h4>
            </div>

            <div className="relative">
              <div className="space-y-4">
                <div className="relative z-10">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-white">
                      <TbShoppingCartCheck className="text-xl text-primary-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">Order Placed</p>
                      <p className="text-white">An order has been placed</p>
                      <p className="text-grey-200 text-xs">22/09/2022, 03:00</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-white">
                      <BiSolidTimer className="text-xl text-primary-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">Processing</p>
                      <p className="text-white">
                        Seller has processed your order
                      </p>
                      <p className="text-grey-200 text-xs">22/09/2022, 03:25</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <BsFillBackpack4Fill className="text-xl" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">Packed</p>
                      <p className="text-grey-200">DD/MM/YYYY, 00:00</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <TbTruck className="text-xl" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">Shipping</p>
                      <p className="text-grey-200">DD/MM/YYYY, 00:00</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-dark-400">
                      <CgFileDocument className="text-xl" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">Delivered</p>
                      <p className="text-grey-200">DD/MM/YYYY, 00:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-[18px] z-0 flex w-full h-full">
                <div className="border border-l-[1px] border-dashed border-dark-400"></div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
