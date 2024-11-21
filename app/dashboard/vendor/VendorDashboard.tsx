'use client';

import { useAuth } from '@/app/context/AuthContext';
import SubHeading from '@/app/components/product/SubHeading';
import { useAccountNavigation } from '../../hooks/useUserAccountNavigation';


const VendorDashboard = () => {
    const { renderContent, handleOptionClick, vendorDashboardOptions, vendorSelectedOption } = useAccountNavigation()

    const { activeUser } = useAuth();

    if (!activeUser) {
        return null;
    }




    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md border-r">
                <div className='py-5'>
                    <SubHeading title='Vendor Dashboard' center />
                </div>


                <ul className="flex flex-col">
                    {vendorDashboardOptions.map((option) => (
                        <li
                            key={option.key}
                            onClick={() => handleOptionClick(option.key)}
                            className={`p-4 cursor-pointer ${vendorSelectedOption === option.key
                                ? 'bg-green-500 text-white'
                                : 'hover:bg-green-100'
                                }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            {/* Toggle between the vendor form and the sidebar content. */}
            <main className="flex-1 p-8">
                {renderContent()}
            </main>
        </div>
    );
}

export default VendorDashboard;