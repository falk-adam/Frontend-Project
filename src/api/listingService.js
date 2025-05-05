import api from "./axios";

// get all listings
export const getAllListings = async () => {
  const response = await api.get("/listings");
  return response.data;
};

export const getListingsById = async (listingId) => {
  console.log("Fetching listing with ID:", listingId);  // Debugging
  const response = await api.get(`/listings/id/${listingId}`);
  console.log("API response data:", response.data); // Debugging
  return response.data;
};