import Button from "@/components/Button";
import { Select, TextInput } from "@/components/dashboard/Inputs";
import Section from "@/components/dashboard/Section";

export default function AdditionalInfo() {
  return (
    <div className="space-y-6">
      <Section>
        <h4 className="text-white text-lg mb-6">Category</h4>

        <div className="space-y-4">
          <Select
            placeholder="Select a category"
            label="Product Category"
            options={[
              { label: "Select a category", value: "" },
              { label: "Category A", value: "Category A" },
              { label: "Category B", value: "Category B" },
            ]}
          />

          <Select
            placeholder="Select tags"
            label="Product Tags"
            options={[
              { label: "Select tags", value: "" },
              { label: "Tag A", value: "Tag A" },
              { label: "Tag B", value: "Tag B" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="flex items-center justify-between">
          <h4 className="text-white text-lg mb-6">Status</h4>
          <Button variant="secondary">Draft</Button>
        </div>

        <Select
          placeholder="Draft"
          label="Product Status"
          options={[
            { label: "Draft", value: "" },
            { label: "Draft A", value: "Draft A" },
            { label: "Draft B", value: "Draft B" },
          ]}
        />
      </Section>
    </div>
  );
}
