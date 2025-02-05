import { saveRentalData } from '../saveRentalData'; // Adjust the import path as needed

export async function POST(request) {
  try {
    const rentalData = await request.json();
    const result = await saveRentalData(rentalData);
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}