"use client";
import React from "react";

interface PickupDropoffData {
  date: string;
  location: string;
  time: string;
}

interface RentalInfoProps {
  formData: {
    pickup: PickupDropoffData;
    dropoff: PickupDropoffData;
  };
  onInputChange: (field: `pickup.${keyof PickupDropoffData}` | `dropoff.${keyof PickupDropoffData}`, value: string) => void;
}

const RentalInfo = ({ formData, onInputChange }: RentalInfoProps) => {
  const handleChange = (
    type: "pickup" | "dropoff",
    field: keyof PickupDropoffData,
    value: string
  ) => {
    onInputChange(`${type}.${field}`, value);
  };

  return (
    <div>
      <div className="w-[780px] h-auto bg-white p-6 rounded-lg shadow-md my-6">
        <div className="flex justify-between px-5 py-2 items-center border-b pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Rental Info</h2>
            <p className="text-sm text-gray-500">Please select your rental details</p>
          </div>
          <span className="text-sm text-gray-400">Step 2 of 4</span>
        </div>

        {(["pickup", "dropoff"] as const).map((type) => (
          <div key={type} className="mt-6">
            <h3 className="text-md font-semibold text-gray-700 capitalize">{type} Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label htmlFor={`${type}_location`} className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  name="location"
                  value={formData[type].location}
                  onChange={(e) => handleChange(type, "location", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-6 py-3"
                  required
                >
                  <option value="">Select your city</option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              </div>

              <div>
                <label htmlFor={`${type}_date`} className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData[type].date}
                  onChange={(e) => handleChange(type, "date", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-6 py-3"
                  required
                />
              </div>

              <div>
                <label htmlFor={`${type}_time`} className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData[type].time}
                  onChange={(e) => handleChange(type, "time", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-6 py-3"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalInfo;