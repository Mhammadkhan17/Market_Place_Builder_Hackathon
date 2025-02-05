"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link component for navigation

interface Car {
  _id: string;
  name: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  price_per_day: string;
  imageUrl: string;
  imageMetadata?: {  // Make optional with ?
    width: number;
    height: number;
  };
  tags: string[];
}

interface CatalogueCarProps {
  cars: Car[];
  tag: string;
  maxVisible: number;
}

const CatalogueCar: React.FC<CatalogueCarProps> = ({
  cars,
  tag,
  maxVisible,
}) => {
  const [visibleCount, setVisibleCount] = useState(maxVisible);

  // Filter cars by tag
  const filteredCars = cars.filter((car) =>
    car.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + maxVisible);
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{tag}</h2>
      {filteredCars.length === 0 ? (
        <p className="text-gray-500">No cars available for this category.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.slice(0, visibleCount).map((car) => (
              <Link key={car._id} href={`/cars/${car._id}`} passHref>
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
                  style={{ width: "304px", height: "388px" }}
                >
                  {/* Image Section */}
                  <div className="flex justify-center w-full h-48">
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      width={car.imageMetadata?.width}
                      height={car.imageMetadata?.height}
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Car Details Section */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{car.name}</h3>
                    <p className="text-gray-600">Type: {car.type}</p>
                    <p className="text-gray-600">Fuel: {car.fuelCapacity}</p>
                    <p className="text-gray-600">
                      Transmission: {car.transmission}
                    </p>
                    <p className="text-gray-600">
                      Seating: {car.seatingCapacity}
                    </p>
                    <p className="text-lg font-semibold text-blue-500">
                      {car.price_per_day}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {visibleCount < filteredCars.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CatalogueCar;
