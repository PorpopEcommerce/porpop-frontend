import Button from '@/app/components/product/Button';
import Heading from '@/app/components/product/Heading';
import AddProductForm from '@/app/components/user/AddProductForm'
import React, { VoidFunctionComponent } from 'react'


interface EditProductFormProps {
    productId: string | null;
    handleCancelEditClick: () => void
}

const EditProductForm: React.FC<EditProductFormProps> = ({ productId, handleCancelEditClick }) => {
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                
                    <Heading title='Edit Product' />
                    <Button
                        label='Cancel Update'
                        custom='max-w-[fit-content] bg-red-700 border-red-700'
                        onClick={handleCancelEditClick}
                    />
                
            </div>
            <AddProductForm productId={productId} />
        </div>
    )
}

export default EditProductForm
