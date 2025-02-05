import { createClient } from '@sanity/client';

// Create a Sanity client instance
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // Replace with your dataset name
  apiVersion: '2023-01-01',                            // Use the latest date or a fixed version for stability
  useCdn: false,                                       // Set to `true` for faster reads (if data freshness isn't critical)
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,                 // Replace with your Sanity API token
});

// Function to save rental data
export const saveRentalData = async (rentalData) => {
  console.log('Rental data to save:', rentalData); // Debug: Log rental data

  // Validate rentalData (Optional)
  if (!rentalData || typeof rentalData !== 'object') {
    throw new Error('Invalid rental data provided');
  }

  try {
    const result = await client.create({
      _type: 'rental', // Ensure the schema type matches your Sanity schema
      ...rentalData,   // Spread rental data
    });

    console.log('Rental data saved successfully:', result); // Debug: Log success
    return result;
  } catch (error) {
    console.error('Error saving rental data:', error.message); // Log only the error message
    throw new Error('Failed to save rental data. Please try again later.');
  }
};
