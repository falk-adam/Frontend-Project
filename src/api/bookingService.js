import api from "./axios";

//BookingService
//connects to "/bookings/**"-backend endpoints

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

//get a single booking by id
export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking by ID: ", error);
    throw error;
  }
};

//get bookings current user
export const getMyBookings = async () => {
  try {
    const response = await api.get(`/bookings/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings current user: ", error);
    throw error;
  }
};

//delete booking by id
export const deleteBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response;
  } catch (error) {
    console.error("Error deleting booking: ", error);
    throw error;
  }
};

//get all bookings for the LISTINGS of the current user
export const getMyListingBookings = async () => {
  try {
    const response = await api.get(`/bookings/host`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings current user's listings: ", error);
    throw error;
  }
};

//accept a bookingRequest w. status pending
export const acceptBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/accept/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error accepting booking: ", error);
    throw error;
  }
};

//reject a bookingRequest w. status pending
export const rejectBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/reject/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error accepting booking: ", error);
    throw error;
  }
};
