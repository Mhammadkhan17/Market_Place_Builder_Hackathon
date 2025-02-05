"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PaymentMethods from "./PaymentMethod";
import Confirmation from "./Confirmation";
import RentalSummary from "./RentalSummary";
import BillingInfo from "./BillingInfo";
import RentalInfo from "./RentalInfo";
import client from "@/lib/sanity";

const MainPage = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for form data
  const [formData, setFormData] = useState({
    billingInfo: {
      name: "",
      phone: "",
      address: "",
      city: "",
    },
    rentalInfo: {
      pickup: {
        date: "",
        location: "",
        time: "",
      },
      dropoff: {
        date: "",
        location: "",
        time: "",
      },
    },
    paymentMethod: {
      method: "", // Payment method (e.g., "credit-card", "paypal", "bitcoin")
      cardDetails: {
        cardNumber: "", // Credit card number
        expirationDate: "", // Expiration date (e.g., "MM/YY")
        cardHolder: "", // Cardholder name
        cvc: "", // CVC code
      },
    },
    agreedToMarketing: false,
    agreedToTerms: false,
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Fetch car details when the component mounts
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          fuelCapacity,
          transmission,
          seatingCapacity,
          type
        }`;
        const car = await client.fetch(query, { carId });
        console.log("Fetched car data:", car); // Verify imageUrl exists here
        setSelectedCar(car);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (carId) fetchCarDetails();
  }, [carId]);

  // Handle input changes for billing and rental info
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      const keys = field.split("."); // Handle nested fields (e.g., "pickup.location")
      let current = updatedData[section];

      // Traverse nested fields
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      // Update the final field
      current[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle payment method updates
  const handlePaymentChange = useCallback((data) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: {
        method: data.method, // Update the payment method
        cardDetails: data.method === "credit-card" ? data.cardDetails : {}, // Only include cardDetails for credit-card
      },
    }));
  }, []);

  // Submit the form and send data to Sanity
  const handleSubmit = async () => {
    if (!selectedCar) {
      alert("Please select a car first.");
      return;
    }

    try {
      const response = await fetch("/api/saveRentalData", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          carDetails: selectedCar, // Include car details in the submission
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setConfirmationMessage("Your rental has been confirmed!");
      } else {
        setConfirmationMessage("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setConfirmationMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div className="max-w-7xl py-12">
      <div className="flex justify-between gap-x-6">
        {/* Left Side: Payment, Confirmation, Billing, and Rental Info */}
        <div className="mx-3 space-y-8">
          <BillingInfo
            formData={formData.billingInfo}
            onInputChange={handleInputChange}
          />
          <RentalInfo
            formData={formData.rentalInfo}
            onInputChange={handleInputChange}
          />
          <PaymentMethods onPaymentChange={handlePaymentChange} />
          <Confirmation
            formData={formData}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right Side: Rental Summary */}
        <div>
          {loading ? (
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-md my-12 p-4">
              Loading car details...
            </div>
          ) : selectedCar ? (
            <RentalSummary car={selectedCar} />
          ) : (
            <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-md my-12 p-4">
              Car details not found.
            </div>
          )}
        </div>
      </div>

      {confirmationMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default MainPage;