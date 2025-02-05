"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const PaymentMethods = ({ onPaymentChange }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cardHolder: "",
    cvc: "",
  });

  // Notify parent component when payment method or card details change
  useEffect(() => {
    if (onPaymentChange) {
      onPaymentChange({
        method: paymentMethod,
        cardDetails: paymentMethod === "credit-card" ? cardDetails : {},
      });
    }
  }, [paymentMethod, cardDetails, onPaymentChange]);

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.id;
    setPaymentMethod(selectedMethod);

    // Clear card details if switching from credit card
    if (selectedMethod !== "credit-card") {
      setCardDetails({
        cardNumber: "",
        expirationDate: "",
        cardHolder: "",
        cvc: "",
      });
    }
  };

  // Handle card details input changes
  const handleCardDetailsChange = (e) => {
    const { id, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="w-[780px] h-auto bg-white p-6 rounded-lg shadow-md my-6">
        <div className="flex justify-between px-5 py-2 items-center border-b pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <p className="text-sm text-gray-500">Please select and enter your payment details</p>
          </div>
          <span className="text-sm text-gray-400">Step 3 of 4</span>
        </div>
        <form>
          {/* Credit Card Payment Option */}
          <div className="mt-6">
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentMethodChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="credit-card" className="text-sm font-medium text-gray-900">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Image src="/Visa_Inc._logo 1.png" alt="Visa" width={48} height={16} />
                <Image src="/mc.png" alt="Mastercard" width={32} height={20} />
              </div>
            </div>

            {/* Credit Card Details Form */}
            {paymentMethod === "credit-card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    placeholder="Card number"
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    value={cardDetails.expirationDate}
                    onChange={handleCardDetailsChange}
                    placeholder="MM / YY"
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                    Card Holder
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    value={cardDetails.cardHolder}
                    onChange={handleCardDetailsChange}
                    placeholder="Card holder"
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    value={cardDetails.cvc}
                    onChange={handleCardDetailsChange}
                    placeholder="CVC"
                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div className="flex items-center mt-6 p-4 border rounded-lg">
            <input
              type="radio"
              id="paypal"
              name="payment-method"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="paypal" className="ml-3 flex justify-between px-5 py-2 items-center w-full text-sm font-medium text-gray-900">
              PayPal
              <Image src="/PayPal.png" alt="PayPal" width={80} height={25} />
            </label>
          </div>

          {/* Bitcoin Option */}
          <div className="flex items-center mt-4 p-4 border rounded-lg">
            <input
              type="radio"
              id="bitcoin"
              name="payment-method"
              checked={paymentMethod === "bitcoin"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="bitcoin" className="ml-3 flex justify-between px-5 py-2 items-center w-full text-sm font-medium text-gray-900">
              Bitcoin
              <Image src="/Bitcoin.png" alt="Bitcoin" width={94} height={20} />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethods;