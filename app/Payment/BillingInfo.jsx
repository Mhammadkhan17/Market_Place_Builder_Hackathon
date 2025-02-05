"use client";
import React from "react";

const BillingInfo = ({ formData, onInputChange }) => {
  return (
    <div>
      <div className="w-[780px] h-[336px] bg-white p-6 rounded-lg shadow-md my-6">
        {/* Header Section */}
        <div className="flex justify-between px-5 py-2 items-center border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Billing Info</h2>
            <p className="text-sm text-gray-500">
              Please enter your billing info
            </p>
          </div>
          <span className="text-sm text-gray-300">Step 1 of 3</span>
        </div>

        {/* Form Section */}
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name || ""}
                onChange={(e) => onInputChange("billingInfo", "name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 px-10 py-3"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone number"
                value={formData.phone || ""}
                onChange={(e) => onInputChange("billingInfo", "phone", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 px-10 py-3"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={(e) => onInputChange("billingInfo", "address", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 px-10 py-3"
                required
              />
            </div>

            {/* Town/City Field */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Town / City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Town or city"
                value={formData.city || ""}
                onChange={(e) => onInputChange("billingInfo", "city", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 px-10 py-3"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingInfo;