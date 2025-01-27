import Header from "@/components/dashboard/ecommerce/customers/details/Header";
import Overview from "@/components/dashboard/ecommerce/customers/details/Overview";
import Profile from "@/components/dashboard/ecommerce/customers/details/Profile";
import Table from "@/components/dashboard/ecommerce/customers/details/Table";

export default function CustomersPage() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="">
          <Profile />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Overview />
          <Table />
        </div>
      </div>
    </main>
  );
}
