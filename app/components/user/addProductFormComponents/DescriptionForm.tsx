import TextEditor from "../../TextEditor";
import { FormProduct } from "@/app/types/formProduct";

interface DescriptionFormProps {
    productDescription: string;
 onChange: (field: keyof FormProduct, value: string) => void;}

const DescriptionForm: React.FC<DescriptionFormProps> = ({
    productDescription,
    onChange,
}) => {
    return (
        <div className="mb-3">
            <label className="block text-[12px] font-bold text-white mb-2">
                Description
            </label>
            <TextEditor
                value={productDescription}
                onChange={(value) => onChange("description", value)}
                placeholder="Write your product description here..."
                className="mb-3"
            />
        </div>
    );
};

export default DescriptionForm;
