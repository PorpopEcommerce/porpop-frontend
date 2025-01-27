import AdditionalInfo from "@/components/dashboard/ecommerce/product/add/AdditionalInfo";
import Form from "@/components/dashboard/ecommerce/product/add/Form";
import Header from "@/components/dashboard/ecommerce/product/add/Header";

export default function AddProduct() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />

      <div className="grid lg:grid-cols-4 gap-4">
        <Form />
        <AdditionalInfo />
      </div>
    </main>
  );
}
