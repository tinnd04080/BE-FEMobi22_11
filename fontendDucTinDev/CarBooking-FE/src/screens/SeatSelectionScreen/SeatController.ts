import { getSeatsForTrip } from "../../screens/SeatSelectionScreen/seatModel";

export const fetchSeatsForTrip = async (tripId: string) => {
  try {
    const seats = await getSeatsForTrip(tripId);
    return seats;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};
