import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useCheckout from "@/app/hooks/useCheckout";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const gateway = searchParams.get("gateway"); // paystack

  const { verifyAndCreateShipping } = useCheckout();

  useEffect(() => {
    if (reference && gateway) {
      verifyAndCreateShipping(reference, gateway);
    }
  }, [reference, gateway]);

  return (
    <div className="text-center mt-10">
      Processing your order...
    </div>
  );
};

export default SuccessPage;
