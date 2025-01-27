import Image from "next/image";
import Table from "./Table";

export default function Invoice() {
  return (
    <section className="bg-white rounded-lg shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-200 text-sm p-4">
      <div className="text-grey-500 space-y-10">
        <div className="flex flex-wrap justify-between">
          <div className="space-y-4">
            <Image
              src="/Images/dashboard/vendor logo.png"
              height={36}
              width={200}
              alt="vendor logo"
            />
            <div className="space-y-1">
              <p>4350 Whitetail Lane, Dallas,</p>
              <p>Texas, 75202 USA</p>
              <p>+1 (469) 227 9044</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl text-dark-500 font-bold">Invoice</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1 text-dark-500">
            <p className="text-xs text-grey-500">Bill to</p>
            <p>Josh Adam</p>
            <p>2833 Bel Meadow Drive,</p>
            <p>Fontana, California 92335, USA</p>
          </div>

          <div className="space-y-1 text-dark-500">
            <p className="text-xs text-grey-500">Ship to</p>
            <p>Josh Adam</p>
            <p>2833 Bel Meadow Drive,</p>
            <p>Fontana, California 92335, USA</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <p className="text-grey-500">Invoice ID</p>
            <p className="text-dark-500">#32022</p>
            <p className="text-grey-500">Shipment ID</p>
            <p className="text-dark-500">#SHP-2011REG</p>
            <p className="text-grey-500">Date</p>
            <p className="text-dark-500">2022-12-12</p>
          </div>
        </div>

        <Table />
      </div>
    </section>
  );
}
