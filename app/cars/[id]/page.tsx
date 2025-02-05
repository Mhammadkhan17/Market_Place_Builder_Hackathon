"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import client from "@/lib/sanity"; // Import the Sanity client

interface Car {
  _id: string;
  name: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  originalPrice: string;
  imageUrl: string;
  imageMetadata: {
    width: number;
    height: number;
  };
  tags: string[];
  rating?: number;
}

const CarDetailsPage = () => {
  const router = useRouter();
  // Remove params from props
  const params = useParams(); // Use useParams hook
  const { id } = params; // Destructure id from params

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const query = `*[_type == "car" && _id == $id][0] {
          _id,
          name,
          type,
          fuelCapacity,
          transmission,
          seatingCapacity,
          pricePerDay,
          originalPrice,
          "imageUrl": image.asset->url,
          "imageMetadata": image.asset->metadata.dimensions,
          tags
        }`;
        const data = await client.fetch<Car>(query, { id });
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!car) {
    return <div>Car not found.</div>;
  }

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Car Details Card */}
        <div className="max-w-sm h-[510px] bg-white rounded-lg shadow-md overflow-hidden p-4 my-4">
          {/* Card Header */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 py-8">
                {car.name}
              </h2>
              <div className="flex items-center space-x-1 mt-1">
                {renderRatingStars(car.rating || 4)}
                <p className="text-sm text-gray-500">440+ Reviewers</p>
              </div>
            </div>
            <button className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.74 0 3.41 1 4.5 2.09C11.09 6 12.76 5 14.5 5 16.58 5 18 6.42 18 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          {/* Card Description */}
          <p className="text-sm text-gray-600 mt-2 py-6">
            NISMO has become the embodiment of Nissan&apos;s outstanding
            performance, inspired by the most unforgiving proving ground, the
            &quot;race track&quot;.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
            <div className="flex">
              <span className="font-semibold text-gray-900">Type Car</span>
              <p className="ml-5">{car.type}</p>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900">Capacity</span>
              <p className="ml-5">{car.seatingCapacity}</p>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900">Steering</span>
              <p className="ml-5">{car.transmission}</p>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900">Gasoline</span>
              <p className="ml-5">{car.fuelCapacity}</p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex justify-between items-center mt-4 h-1/4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {car.pricePerDay}
              </p>
              <p className="text-sm text-gray-500 line-through">
                {car.originalPrice}
              </p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              onClick={() => {
                router.push(`/Payment?carId=${car._id}`);
              }}
            >
              Rent Now
            </button>
          </div>
        </div>

        {/* Image Card */}
        <div className="w-96 h-24 my-10">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={`${car.name} Main`}
              width={car.imageMetadata?.width}
              height={car.imageMetadata?.height}
              className="rounded-md"
              quality={100}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 rounded-md">
              <span>No Image Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
