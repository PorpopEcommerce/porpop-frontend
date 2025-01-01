'use client';

import React, { useState, useEffect } from "react";
import SubHeading from "@/app/components/product/SubHeading";
import Button from "@/app/components/product/Button";
import { useRouter } from "next/navigation"; // For route navigation
import Spinner from "@/app/components/Spinner"; // Import the Spinner component

const Subscribe = () => {
  const [plans, setPlans] = useState([]); // Holds the fetched plans
  const [filteredPlans, setFilteredPlans] = useState([]); // Holds the plans filtered by billing cycle
  const [selectedCycle, setSelectedCycle] = useState("monthly"); // Tracks the selected billing cycle
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [scrollPosition, setScrollPosition] = useState(0); // For managing scroll position
  const [isScrollable, setIsScrollable] = useState(false); // Tracks if the container is scrollable
  const router = useRouter(); // For navigation

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
        const response = await fetch(
          "https://backend-porpop.onrender.com/api/v1/billing/plans"
        );
        const data = await response.json();
        setPlans(data);
        setFilteredPlans(
          data.filter((plan) => plan.BillingCycle === "monthly")
        );
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
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

  const handleToggle = (cycle) => {
    setSelectedCycle(cycle);
    setFilteredPlans(plans.filter((plan) => plan.BillingCycle === cycle));
  };

  const handleSelectPlan = (plan) => {
    router.push(
      `/subscribe/payment_initiate?planId=${plan.PlanID}&amount=${plan.Price}&planName=${plan.Name}`
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
    <div className="p-6 bg-[#f4f5ff] h-full">
      <div className="w-full max-w-[100rem] mx-auto">
        {/* Billing cycle toggle */}
        <div className="grid grid-cols-2 p-1 mb-6 w-full max-w-[20rem] mx-auto rounded-full bg-[#dad9da]">
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
              <div className="flex overflow-x-auto" id="plans-container">
                {filteredPlans.map((plan) => (
                  <div
                    key={plan.PlanID}
                    className="flex-shrink-0 w-full sm:w-[calc(100%/3)] md:w-[calc(100%/2)] lg:w-[calc(100%/3)] px-3"
                  >
                    <h3 className="text-lg font-bold text-center mb-3">
                      {plan.Name}
                    </h3>
                    <div className="border rounded-md shadow-md">
                      <div className="h-20 w-full flex justify-center items-center bg-[#9bf618] mb-3">
                        <p className="text-xl font-semibold">
                          NGN {plan.Price.toLocaleString()}
                        </p>
                      </div>
                      <ul className="pl-6 border-b text-gray-600 px-3">
                        {getFeaturesForPlan(plan.Name)?.map((feature, index) => (
                          <li key={index} className="border-b p-4 text-center">
                            {feature}
                          </li>
                        ))}
                      </ul>
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

              {/* Navigation Arrows */}
              {isScrollable && (
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
