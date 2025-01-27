import Customers from "@/components/dashboard/ecommerce/customers/Customers";
import Header from "@/components/dashboard/ecommerce/customers/Header";

export default function CustomersPage() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />
      <Customers />
    </main>
  );
}
