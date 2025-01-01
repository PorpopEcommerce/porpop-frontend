import { useState } from "react";
import TextEditor from "../../TextEditor";
import { Product } from "@/app/types/product";

interface ShortDescriptionFormProps {
  shortDescription: string;
  onChange: (field: keyof Product, value: string) => void;
}

const ShortDescriptionForm: React.FC<ShortDescriptionFormProps> = ({
  shortDescription,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-[12px] font-bold text-gray-700 mb-2">
        Short Description
      </label>
      <TextEditor
        value={shortDescription}
        onChange={(value) => onChange("shortDescription", value)}
        placeholder="Write your product description here..."
        className="mb-3"
      />
    </div>
  );
};

export default ShortDescriptionForm;
