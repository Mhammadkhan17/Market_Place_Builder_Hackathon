"use client";
import React, { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import PaymentMethods from "./PaymentMethod";
import Confirmation from "./Confirmation";
import RentalSummary from "./RentalSummary";
import BillingInfo from "./BillingInfo";
import RentalInfo from "./RentalInfo";
import client from "@/lib/sanity";

// Type definitions
interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  type: string;
  imageMetadata?: {
    width: number;
    height: number;
  };
}

interface FormData {
  billingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  rentalInfo: {
    pickup: {
      date: string;
      location: string;
      time: string;
    };
    dropoff: {
      date: string;
      location: string;
      time: string;
    };
  };
  paymentMethod: {
    method: string;
    cardDetails: {
      cardNumber: string;
      expirationDate: string;
      cardHolder: string;
      cvc: string;
    };
  };
  agreedToMarketing: boolean;
  agreedToTerms: boolean;
}

interface NestedObject {
  [key: string]: string | NestedObject;
}

interface FormSectionProps {
  formData: NestedObject;
  onInputChange: (field: string, value: string) => void;
}

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
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
      method: "",
      cardDetails: {
        cardNumber: "",
        expirationDate: "",
        cardHolder: "",
        cvc: "",
      },
    },
    agreedToMarketing: false,
    agreedToTerms: false,
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!carId) return;

      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          "imageMetadata": image.asset->metadata.dimensions,
          fuelCapacity,
          transmission,
          seatingCapacity,
          type
        }`;
        const car = await client.fetch<Car>(query, { carId });
        setSelectedCar(car);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string
  ) => {
    setFormData((prevData) => {
      const sectionData = { ...(prevData[section] as NestedObject) };
      const fieldParts = field.split(".");
      let current: NestedObject = sectionData;

      for (let i = 0; i < fieldParts.length - 1; i++) {
        current[fieldParts[i]] = current[fieldParts[i]] || {};
        current = current[fieldParts[i]] as NestedObject;
      }

      current[fieldParts[fieldParts.length - 1]] = value;

      return {
        ...prevData,
        [section]: sectionData,
      };
    });
  };

  const handleCheckboxChange = (field: keyof FormData, value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePaymentChange = useCallback(
    (data: {
      method: string;
      cardDetails?: {
        cardNumber: string;
        expirationDate: string;
        cardHolder: string;
        cvc: string;
      };
    }) => {
      setFormData((prevData) => ({
        ...prevData,
        paymentMethod: {
          method: data.method,
          cardDetails:
            data.method === "credit-card" && data.cardDetails
              ? data.cardDetails
              : prevData.paymentMethod.cardDetails,
        },
      }));
    },
    []
  );

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
          carDetails: selectedCar,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setConfirmationMessage(
        response.ok
          ? "Your rental has been confirmed!"
          : "Something went wrong, please try again."
      );
    } catch (error) {
      console.error("Error:", error);
      setConfirmationMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div className="max-w-7xl py-12">
      <div className="flex justify-between gap-x-6">
        <div className="mx-3 space-y-8">
          <BillingInfo
            formData={formData.billingInfo}
            onInputChange={(field: string, value: string) =>
              handleInputChange("billingInfo", field, value)
            }
          />
          <RentalInfo
            formData={formData.rentalInfo}
            onInputChange={(field: string, value: string) =>
              handleInputChange("rentalInfo", field, value)
            }
          />
          <PaymentMethods onPaymentChange={handlePaymentChange} />
          <Confirmation
            formData={formData}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleSubmit}
          />
        </div>

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

const MainPage = () => (
  <Suspense
    fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading payment details...</div>
      </div>
    }
  >
    <PaymentContent />
  </Suspense>
);

export default dynamic(() => Promise.resolve(MainPage), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
    </div>
  ),
});