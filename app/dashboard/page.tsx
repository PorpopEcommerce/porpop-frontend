import ProtectedRoute from "../provider/ProtectedRoute";
import VendorDashboard from "./vendor/VendorDashboard";

const VendorAccount = () => {
    return (
        <ProtectedRoute>
            <VendorDashboard />
        </ProtectedRoute>

    );
}

export default VendorAccount;