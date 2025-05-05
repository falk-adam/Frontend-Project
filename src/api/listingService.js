import api from "./axios";

// get all listings
export const getAllListings = async () => {
  const response = await api.get("/listings");
  return response.data;
};
