import api from "./axios";

//create new booking (w. current user as owner of booking)
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking by ID: ", error);
    throw error;
  }
};

export const getMyBookings = async () => {
  try {
    const response = await api.get(`/bookings/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings current user: ", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response;
  } catch (error) {
    console.error("Error deleting booking: ", error);
    throw error;
  }
};

export const getMyListingBookings = async () => {
  try {
    const response = await api.get(`/bookings/host`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings current user's listings: ", error);
    throw error;
  }
};

export const acceptBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/accept/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error accepting booking: ", error);
    throw error;
  }
};

export const rejectBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/reject/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error accepting booking: ", error);
    throw error;
  }
};
