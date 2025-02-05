"use client";
import React, { useState } from "react"; // Add useState import
import Image from "next/image";

const ConfirmationSection = ({ formData = {}, onCheckboxChange, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructure with default values
  const { agreedToMarketing = false, agreedToTerms = false } = formData;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(); // Call the function from MainPage
    } catch (error) {
      console.error("Error saving rental data:", error);
      alert("Failed to confirm rental. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[780px] h-[484px] p-8 bg-white rounded-lg shadow-md flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Confirmation</h2>
        <p className="text-sm text-gray-500 mt-1">
          We are getting to the end. Just a few clicks and your rental is ready!
        </p>
      </div>

      {/* Checkbox Options */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Newsletter Consent */}
        <div className="flex items-center p-4 border rounded-lg">
          <input
            id="newsletter"
            type="checkbox"
            checked={agreedToMarketing}
            onChange={(e) => onCheckboxChange("agreedToMarketing", e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="newsletter" className="ml-3 text-sm text-gray-900 font-medium">
            I agree with sending Marketing and newsletter emails. No spam, promised!
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center p-4 border rounded-lg">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => onCheckboxChange("agreedToTerms", e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-900 font-medium">
            I agree with our terms and conditions and privacy policy.
          </label>
        </div>

        {/* Rent Now Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-[140px] h-[56px] py-3 text-white ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } rounded-lg font-medium`}
          >
            {isSubmitting ? "Processing..." : "Rent Now"}
          </button>
        </div>
      </form>

      {/* Security Note */}
      <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
        <Image src="/ic-security-safety.png" width={32} height={32} alt="Security Icon" />
        <div>
          <p className="font-medium text-gray-900">All your data are safe</p>
          <p>We are using the most advanced security to provide you the best experience ever.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSection;