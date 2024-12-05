'use client'

import SubHeading from "@/app/components/product/SubHeading";
import AddProductForm from "@/app/components/user/AddProductForm";


const Horizontal = () => {
    return <hr className="w-[100%] my-3" />
}

const AddProduct = () => {
    return (
        <div>
            <div className="relative flex justify-center py-6 w-full border border-zinc-400 rounded-md mb-5">
                <div className="absolute top-3 left-3 bg-white rounded-lg p-1 px-2">
                    <p className="text-[15px] text-zinc-400 text-center">optional</p>
                </div>
                <div className="w-full flex flex-col items-center mb-4">
                    <SubHeading title="Search similar products in this marketplace" />
                    <p className="text-[10px] text-zinc-400 text-center">to duplicate product images, contents, attributes, tags etc</p>
                </div>
            </div>

            <div>
                <SubHeading title="ADD NEW PRODUCT" />

                <Horizontal />

                <AddProductForm />
            </div>

            
            
        </div>
    );
}

export default AddProduct;