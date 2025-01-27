import Button from "@/components/Button";
import DragAndDrop from "@/components/dashboard/DragAndDrop";
import { Select, TextArea, TextInput } from "@/components/dashboard/Inputs";
import Section from "@/components/dashboard/Section";
import { FaDollarSign } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";

export default function Form() {
  return (
    <div className="lg:col-span-3 space-y-6">
      <Section>
        <h4 className="text-white text-lg mb-6">General Information</h4>

        <div className="space-y-4">
          <TextInput
            placeholder="Type product name here..."
            label="Product Name"
          />

          <TextArea
            placeholder="Type product description here..."
            label="Description"
          />
        </div>
      </Section>

      <Section>
        <h4 className="text-white text-lg mb-6">Media</h4>

        <div className="space-y-2">
          <p className="text-grey-300">Photo</p>
          <DragAndDrop />
        </div>
      </Section>

      <Section>
        <h4 className="text-white text-lg mb-6">Pricing</h4>

        <div className="space-y-4">
          <TextInput
            placeholder="Type base price here..."
            label="Base Price"
            icon={<FaDollarSign />}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Select
              placeholder="Select a discount type"
              label="Discount Type"
              options={[
                { label: "Select a discount type", value: "" },
                { label: "Type A", value: "Type A" },
                { label: "Type B", value: "Type B" },
              ]}
            />
            <Select
              placeholder="Type discount percentage"
              label="Discount Percentage (%)"
              options={[
                { label: "Type a discount percentage...", value: "" },
                { label: "Type A", value: "Type A" },
                { label: "Type B", value: "Type B" },
              ]}
            />
            <Select
              placeholder="Select a tax class"
              label="Tax Class"
              options={[
                { label: "Select a tax class", value: "" },
                { label: "Type A", value: "Type A" },
                { label: "Type B", value: "Type B" },
              ]}
            />
            <Select
              placeholder="Type discount percentage"
              label="VAT Amount (%)"
              options={[
                { label: "Type VAT amount...", value: "" },
                { label: "Type A", value: "Type A" },
                { label: "Type B", value: "Type B" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <h4 className="text-white text-lg mb-6">Inventory</h4>

        <div className="grid md:grid-cols-3 gap-4">
          <TextInput placeholder="Type product SKU here..." label="SKU" />

          <TextInput placeholder="Product barcode..." label="Barcode" />

          <TextInput
            placeholder="Type product quantity here..."
            label="Quantity"
          />
        </div>
      </Section>

      <Section>
        <h4 className="text-white text-lg mb-6">Variation</h4>

        <div className="md:flex space-y-4 flex-wrap items-end gap-4 mb-4">
          <div className="flex-1">
            <Select
              placeholder="Select a variation"
              label="Variation Type"
              options={[
                { label: "Select a variation", value: "" },
                { label: "Variation A", value: "Variation A" },
                { label: "Variation B", value: "Variation B" },
              ]}
            />
          </div>
          <TextInput placeholder="Variation..." label="Variation" />
          <div className="flex items-end h-full">
            <Button
              variant="secondary"
              icon={<HiPlus className="text-lg text-red-400" />}
              className="h-[46px]"
            />
          </div>
        </div>
        <div className="md:flex space-y-4 flex-wrap items-end gap-4">
          <div className="flex-1">
            <Select
              placeholder="Select a variation"
              label="Variation Type"
              options={[
                { label: "Select a variation", value: "" },
                { label: "Variation A", value: "Variation A" },
                { label: "Variation B", value: "Variation B" },
              ]}
            />
          </div>
          <TextInput placeholder="Variation..." label="Variation" />
          <div className="flex items-end h-full">
            <Button
              variant="secondary"
              icon={<HiPlus className="text-lg text-red-400" />}
              className="h-[46px]"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-4">
          <h4 className="text-white text-lg">Shipping</h4>

          <div className="items-center flex gap-2">
            <input type="checkbox" />
            <p className="font-medium text-white">This is a physical product</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <TextInput placeholder="Product weight..." label="Weight" />

            <TextInput placeholder="Height (cm)..." label="Height" />

            <TextInput placeholder="Length (cm).." label="Length" />

            <TextInput placeholder="Width (cm).." label="Width" />
          </div>
        </div>
      </Section>
    </div>
  );
}
