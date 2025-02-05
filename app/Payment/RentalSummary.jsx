"use client";
import React, { useState } from "react";
import Image from "next/image";

const RentalSummary = ({ car }) => {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(car?.pricePerDay || 80);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscountedPrice((prev) => Math.round(prev * 0.9)); // 10% discount
      setIsPromoApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  if (!car) return null;

  return (
    <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-md my-12">
      <h3 className="text-3xl mt-10 pl-5">Rental Summary</h3>
      <p className="px-3 mt-3">
        Prices may change depending on the length of the rental and the price of your rental car.
      </p>
      <div className="flex justify-center mt-8">
        {car.imageUrl && (
          <div className="relative w-[132px] h-[108px]">
            <Image
              src={car.imageUrl}
              alt={car.name}
              fill // Use fill to make the image responsive
              className="object-contain" // Ensure the image fits within the container
            />
          </div>
        )}
        <div className="mx-5">
          <h1 className="text-4xl">{car.name}</h1>
          <div className="flex items-center text-yellow-500">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21zM12 15.4l3.76 2.27-.99-4.28 3.32-2.88-4.38-.37L12 6.1l-1.71 3.94-4.38.37 3.32 2.88-.99 4.28z" />
            </svg>
          </div>
          <p className="text-sm">440+ Reviews</p>
        </div>
      </div>
      <div className="my-7">
        <hr />
      </div>
      <div className="flex justify-between px-5 py-2">
        <p>Subtotal</p>
        <p>{car.pricePerDay}</p>
      </div>
      <div className="flex justify-between px-5 py-2">
        <p>Tax</p>
        <p>$0</p>
      </div>
      <div className="w-4/5 mx-auto bg-gray-50 py-3 px-6 rounded-lg flex justify-between items-center">
        <label className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-400">Apply promo code</span>
          <div className="flex items-center">
            <input
              type="text"
              value={promoCode}
              onChange={handlePromoCodeChange}
              placeholder="Enter code"
              className="p-2 rounded-md border border-gray-300 text-sm"
            />
            <button
              onClick={handleApplyPromoCode}
              className="ml-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Apply now
            </button>
          </div>
        </label>
      </div>
      <div className="w-full px-5 pt-16 flex justify-between">
        <div>
          <p className="text-lg font-bold">Total Rental Price</p>
          <p className="text-sm font-medium text-[#90A3BF]">
            Overall price and includes rental discount
          </p>
        </div>
        <div className="text-3xl">{discountedPrice}</div>
      </div>
    </div>
  );
};

export default RentalSummary;