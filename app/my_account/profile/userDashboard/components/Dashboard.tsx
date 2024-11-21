"use client"

import { useAuth } from '@/app/context/AuthContext';
import SubHeading from '@/app/components/product/SubHeading';
import Button from '@/app/components/product/Button';
import { useRouter } from 'next/navigation';

interface DashboardProps {
    handleVendorFormClick: () => void; // Accept the vendor handler as a prop
}


const Dashboard: React.FC<DashboardProps> = ({ handleVendorFormClick }) => {

    const { activeUser, logout } = useAuth();
    const router = useRouter();


    if (!activeUser) {
        return null;
    }

    // Check if the user has the "vendor" role
    const isVendor = Array.isArray(activeUser.role) && activeUser.role.includes("vendor");



    return (
        <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
                <SubHeading title={`Welcome, ${activeUser.username}!`} />
                <p>{activeUser.email}</p>
                <p>Not {activeUser.username}? <span className='underline cursor-pointer' onClick={() => logout()}>Log out</span></p>

            </section>


            {/* Other Details */}
            <section>
                <div className='w-full max-w-[200px]'>
                    {isVendor ? <Button
                        label="Vendor Dashboard"
                        onClick={() => (router.push('/dashboard'))}
                    />
                        : <Button
                            label="Become a Vendor"
                            onClick={handleVendorFormClick}
                        />
                    }

                </div>
            </section>

        </div>
    );
};

export default Dashboard;
