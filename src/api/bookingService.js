import api from "./axios";

//create new booking (w. current user as owner of booking)
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error(
      "Create booking error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lbookin by ID: ", error);
    throw error;
  }
};
