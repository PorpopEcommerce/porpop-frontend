"use client";

import { useState, useEffect } from "react";
import Button from "../components/product/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Heading from "../components/product/Heading";
import { formatPrice } from "../utils/formatter";
import useCheckout from "../hooks/useCheckout";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

type CountryData = {
  [key: string]: {
    code: string;
    states: {
      [key: string]: string[];
    };
  };
};

const countriesData: CountryData = {
  Nigeria: {
    code: "+234",
    states: {
      "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene"],
      Lagos: ["Ikeja", "Epe", "Badagry"],
    },
  },
  USA: {
    code: "+1",
    states: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
    },
  },
};

const Page = () => {
  const { form, errors, isSubmitting, handleChange, handleSubmit } =
    useCheckout();

  const [country, setCountry] = useState("Nigeria");
  const [phoneCode, setPhoneCode] = useState(countriesData["Nigeria"].code);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const product = query.get("product"); // For direct purchase
    const cart = query.get("cart"); // For cart checkout
    const subtotalParam = query.get("subtotal");

    if (product) {
      // Handle direct purchase
      const productData = JSON.parse(product);
      setProducts([productData]); // Wrap in an array for consistency
      setSubtotal(productData.price * productData.quantity);
    } else if (cart && subtotalParam) {
      // Handle cart checkout
      const cartData = JSON.parse(cart);
      setProducts(cartData);
      setSubtotal(Number(subtotalParam));
    }
  }, []);

  // if (!products || products.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setPhoneCode(countriesData[selectedCountry].code); // Update phone code
    setCities([]); // Reset cities
    setState(""); // Reset state
    setCity(""); // Reset city
    handleChange("country", selectedCountry); // Update form
    handleChange("state", ""); // Reset state in form
    handleChange("city", ""); // Reset city in form
  };

  const handleStateChange = (selectedState: string) => {
    setState(selectedState); // Update state
    const newCities = countriesData[country].states[selectedState] || [];
    setCities(newCities); // Populate cities based on selected state
    setCity(""); // Reset city
    handleChange("state", selectedState); // Update state in form
    handleChange("city", ""); // Reset city in form
  };

  return (
    <div className="flex flex-col md:flex-row p-5 bg-gray-50 min-h-screen">
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>{" "}
          / <span>Contact Information</span>
        </div>
        {/* Shipping Address Section */}
        <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country / Region
              </label>
              <select
                value={form.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(countriesData).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center">
                  <span className="p-2 border border-gray-300 rounded-l-md bg-gray-100">
                    {phoneCode}
                  </span>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={form.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    className="flex-1 block w-full p-2 border-t border-r border-b border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={form.streetAddress}
                onChange={(e) => handleChange("streetAddress", e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={form.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a state</option>
                  {Object.keys(countriesData[country].states).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  disabled={!state || cities.length === 0}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a city</option>
                  {cities.map((cityOption) => (
                    <option key={cityOption} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal code <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="max-w-[400px] w-full p-3 sticky top-4">
        <div className="w-full border border-slate-300 p-3">
          <Heading title="Order Details" />
          <div className="mt-6">
            {products.map((product, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {formatPrice(product.price)}</p>
                <hr className="my-4" />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Subtotal:</h2>
            <p>{formatPrice(subtotal)}</p>
          </div>
          <div className="mt-6">
            <Button
              label={isSubmitting ? "Sending" : "Proceed to Payment"}
              onClick={() => handleSubmit(products, subtotal)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
