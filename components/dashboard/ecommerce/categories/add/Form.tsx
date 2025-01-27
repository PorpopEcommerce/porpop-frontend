import { TextArea, TextInput } from "@/components/dashboard/Inputs";
import Section from "@/components/dashboard/Section";

export default function Form() {
  return (
    <Section>
      <h4 className="text-white text-lg mb-6">General Information</h4>

      <div className="space-y-4">
        <TextInput
          placeholder="Type category name here..."
          label="Category Name"
        />

        <TextArea
          placeholder="Type category description here..."
          label="Description"
        />
      </div>
    </Section>
  );
}
