import Form from "@/components/dashboard/ecommerce/categories/add/Form";
import Header from "@/components/dashboard/ecommerce/categories/add/Header";
import Upload from "@/components/dashboard/ecommerce/categories/add/Upload";

export default function AddCategory() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />

      <div className="grid lg:grid-cols-4 gap-4">
        <div>
          <Upload />
        </div>
        <div className="lg:col-span-3">
          <Form />
        </div>
      </div>
    </main>
  );
}
