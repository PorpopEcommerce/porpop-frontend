'use client';

import { useState } from "react";
import Button from "@/app/components/product/Button";
import AliExpressImportModal from "@/app/dashboard/vendor/components/AliExpressImportModal"; // Adjust the path as needed

interface ProductHeaderProp {
    handleAddProductClick: () => void;
    handleImportClick: () => void;
    handleExportClick: () => void;
}

const ProductHeader: React.FC<ProductHeaderProp> = ({ handleAddProductClick, handleImportClick, handleExportClick }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="grid grid-cols-2 gap-5 mb-3">
                <div></div>
                <div className="flex flex-col items-end gap-4">
                    <Button
                        label="Add Product"
                        custom="max-w-[fit-content] bg-red-700 border-red-700"
                        onClick={handleAddProductClick}
                    />

                    <Button
                        label="Import Product from AliExpress"
                        custom="max-w-[fit-content] bg-red-700 border-red-700"
                        onClick={() => setModalOpen(true)}
                    />
                    <div className="flex gap-3">
                        <Button
                            label="Import AliExpress settings"
                            custom="max-w-[fit-content] bg-red-700 border-red-700"
                        />
                        <Button
                            label="Import"
                            custom="max-w-[fit-content] bg-red-700 border-red-700"
                            onClick={handleImportClick}
                        />
                        <Button
                            label="Export"
                            custom="max-w-[fit-content] bg-red-700 border-red-700"
                            onClick={handleExportClick}
                        />
                    </div>
                </div>
            </div>

            {/* AliExpress Import Modal */}
            <AliExpressImportModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};

export default ProductHeader;
