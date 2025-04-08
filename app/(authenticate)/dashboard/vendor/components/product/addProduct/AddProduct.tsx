"use client";

import SubHeading from "@/app/components/product/SubHeading";
import AddProductForm from "@/app/components/user/AddProductForm";
import Button from "@/app/components/product/Button";

const Horizontal = () => {
  return <hr className="w-[100%] my-3" />;
};

interface AddProductProps {
  handleViewProductClick: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ handleViewProductClick }) => {
  return (
    <div>

      <div>
        <div className="flex justify-between items-center">
          <SubHeading title="ADD NEW PRODUCT" />
          <Button
            label="X Cancel"
            onClick={handleViewProductClick}
            custom="max-w-fit bg-red-600"
          />
        </div>

        <Horizontal />

        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProduct;
