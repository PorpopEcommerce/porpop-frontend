import Button from '@app/components/product/Button';

const Product = () => {
    return ( 
        <div>
            <div className="grid grid-cols-2 gap-5">
                <div>

                </div>
                <div className="flex flex-col items-end gap-4">
                    <Button label='Add Product'/>

                </div>

            </div>
        </div>
     );
}
 
export default Product;