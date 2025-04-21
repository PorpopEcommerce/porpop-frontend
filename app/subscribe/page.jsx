"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { TiTick } from "react-icons/ti";

const BASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

const Subscribe = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const [isScrollable, setIsScrollable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false); // Tracks screen size
  const router = useRouter();

  const featuresMap = {
    Starter: [
      "Account Full Access",
      "50 advert publish",
      "24/7 support",
      "10% Commission on sales",
      "Add 2-5 staff",
      "365 days",
    ],
    Basic: [
      "Account Full Access",
      "50 advert publish",
      "24/7 support",
      "10% Commission on sales",
      "Add 2-5 staff",
      "365 days",
      "Automatic ads publish",
      "Ali-Express Extension",
    ],
    Premium: [
      "Account Full Access",
      "24/7 support",
      "Add 2-5 staff",
      "365 days",
      "Automatic ads publish",
      "Ali-Express Extension",
      "5% Commission on sales",
      "Add product video",
      "Add variable product",
      "Auto order fulfillment",
      "Promote unlimited product",
      "Add unlimited staff",
      "Free store setup",
      "Unlimited product",
    ],
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/v1/billing/plans/list`);
        const data = response.data.body.plans;
        setPlans(data);
        setFilteredPlans(data.filter((plan) => plan.billing_cycle === "monthly"));
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    // Check if the container is scrollable
    const container = document.getElementById("plans-container");
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
    }
  }, [filteredPlans]);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // Mobile & tablet < 1024px
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const handleToggle = (cycle) => {
    setSelectedCycle(cycle);
    setFilteredPlans(plans.filter((plan) => plan.billing_cycle === cycle));
  };

  const handleSelectPlan = (plan) => {
    router.push(
      `/subscribe/payment_initiate?planId=${plan.id}&amount=${plan.display_price}&currency=${encodeURIComponent(plan.currency)}&planName=${encodeURIComponent(plan.name)}`
    );    
  };

  const getFeaturesForPlan = (planName) => {
    if (planName.includes("Starter")) return featuresMap.Starter;
    if (planName.includes("Basic")) return featuresMap.Basic;
    if (planName.includes("Premium")) return featuresMap.Premium;
    return [];
  };

  const handleScroll = (direction) => {
    const container = document.getElementById("plans-container");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-[#111827] h-full text-white">
      <div className="w-full max-w-[100rem] mx-auto">
        {/* Billing cycle toggle */}
        <div className="grid grid-cols-2 p-1 mb-6 w-full max-w-[20rem] mx-auto rounded-full bg-[#1f2937]">
          <button
            onClick={() => handleToggle("monthly")}
            className={`rounded-full p-2 font-semibold ${
              selectedCycle === "monthly" ? "bg-[#9bf618]" : "bg-transparent"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleToggle("yearly")}
            className={`rounded-full p-2 font-semibold ${
              selectedCycle === "yearly" ? "bg-[#9bf618]" : "bg-transparent"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* If loading, show the spinner */}
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
            {/* Scrollable container */}
            <div className="relative">
              <div className="flex overflow-x-auto scrollbar-hide p-3" id="plans-container">
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex-shrink-0 w-full sm:w-[calc(100%/3)] md:w-[calc(100%/2)] lg:w-[calc(100%/3)] px-3"
                  >
                    <div className="border h-full flex flex-col justify-between rounded-md shadow-md bg-[#1f2937] p-3">
                      <div>
                        <h3 className="text-lg font-bold mb-3">{plan.name}</h3>
                        <div className="h-20 w-full flex justify-center items-center rounded-2xl bg-[#9bf618] mb-3">
                        <p className="text-xl font-semibold">
                          {plan.currency} {plan.display_price.toLocaleString()}
                        </p>
                       </div>
                        <ul className="pl-6 text-white">
                          {getFeaturesForPlan(plan.name)?.map((feature, index) => (
                            <li key={index} className="flex gap-2 mb-3 text-left">
                              <TiTick className="text-xl text-[#9bf618] mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="py-4 flex items-center justify-center">
                        <button
                          className="bg-[#9bf618] text-white py-2 px-4 rounded"
                          onClick={() => handleSelectPlan(plan)}
                        >
                          PAY WITH LOCAL CURRENCY
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows (only on mobile & tablet) */}
              {isScrollable && isMobileOrTablet && (
                <>
                  <button
                    onClick={() => handleScroll("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
