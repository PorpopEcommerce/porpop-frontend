import Button from "@/components/Button";
import Header from "@/components/dashboard/ecommerce/orders/details/invoice/Header";
import Invoice from "@/components/dashboard/ecommerce/orders/details/invoice/Invoice";
import Section from "@/components/dashboard/Section";
import { BsSendFill } from "react-icons/bs";
import { MdEdit, MdOutlineFileDownload, MdPrint } from "react-icons/md";
export default function InvoicePage() {
  return (
    <main className="space-y-8 overflow-hidden">
      <Header />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Invoice />
        </div>
        <div className="">
          <Section>
            <div className="flex flex-col gap-3">
              <Button
                variant="green"
                icon={<BsSendFill className="text-white" />}
                pos="center"
              >
                Send Invoice
              </Button>
              <Button
                variant="secondary"
                icon={<MdOutlineFileDownload />}
                pos="center"
              >
                Download Invoice
              </Button>
              <Button variant="secondary" icon={<MdPrint />} pos="center">
                Print Invoice
              </Button>
              <Button variant="secondary" icon={<MdEdit />} pos="center">
                Edit Invoice
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
