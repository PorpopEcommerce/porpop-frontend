import { useState } from "react";
import TextEditor from "../../TextEditor";

interface DescriptionFormProps {
    productDescription: string;
    onChange: (field: string, value: string) => void;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
    productDescription,
    onChange,
}) => {
    return (
        <div className="mb-3">
            <label className="block text-[12px] font-bold text-gray-700 mb-2">
                Description
            </label>
            <TextEditor
                value={productDescription}
                onChange={(value) => onChange("productDescription", value)}
                placeholder="Write your product description here..."
                className="mb-3"
            />
        </div>
    );
};

export default DescriptionForm;
