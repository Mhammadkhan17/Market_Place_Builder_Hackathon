import { createClient } from '@sanity/client';
import TopSection from './components/TopSection/TopSection';
import PickUpSection from './components/Pickupsection/pickupsection';
import CatalogueCar from './components/CatalogueCar';

const client = createClient({
  projectId: process.env.projectId,
  dataset: process.env.dataset,
  apiVersion: '2023-01-01',
  useCdn: true,
});

const fetchCars = async () => {
  const query = `
    *[_type == "car"] {
      _id,
      name,
      type,
      fuelCapacity,
      transmission,
      seatingCapacity,
      price_per_day,
      "imageUrl": image.asset->url,
     "imageMetadata": image.asset->metadata.dimensions,
      tags
    }
  `;
  const data = await client.fetch(query);
  // Log all fetched cars 
  console.log('Fetched Cars:', data);  
  return data;
};

export default async function HomePage() {
  const cars = await fetchCars();

  return (
    <div className="container mx-auto p-4">
      {/* Top Section */}
      <TopSection/>
      {/* PickUp Section */}
      <PickUpSection/>
      {/* Popular Cars Section */}
      <CatalogueCar cars={cars} tag="popular" maxVisible={4} />
      {/* Recommendation Cars Section */}
      <CatalogueCar cars={cars} tag="recommended" maxVisible={8} />
    </div>
  );
}
