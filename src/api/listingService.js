import api from "./axios";

// get all listings
export const getAllListings = async () => {
  try {
    const response = await api.get("/listings");
  return response.data;
  } catch (error) {
    console.error("Error fetching listings: ", error)
    throw error;
  }
};

export const getListingsById = async (listingId) => {
  try {
    console.log("Fetching listing with ID:", listingId);  // Debugging
    const response = await api.get(`/listings/${listingId}`);
    console.log("API response data:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching listing by ID: ", error)
    throw error;
  }
};

export const getHostProfile = async () => {
  try {

  } catch (error) {
    console.error("Error: ", error)
    throw error;
  }
};