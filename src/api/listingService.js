import api from "./axios";

// get all listings
export const getAllListings = async () => {
  const response = await api.get("/listings");
  return response.data;
};

// get listings by location
export const getListingsByLocation = async (location) => {
  const response = await api.get(`/listings/location/${location}`);
  return response.data;
};

// get listings by capacity range
export const getListingsByCapacity = async (minCapacity, maxCapacity) => {
  const response = await api.get(`/listings/capacity`, {
    params: { minCapacity, maxCapacity },
  });
  return response.data;
};
