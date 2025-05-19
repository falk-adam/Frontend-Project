import api from "./axios";

// get all listings
export const getAllListings = async () => {
  try {
    const response = await api.get("/listings");
    return response.data;
  } catch (error) {
    console.error("Error fetching listings: ", error);
    throw error;
  }
};

export const getListingById = async (listingId) => {
  try {
    const response = await api.get(`/listings/${listingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listing by ID: ", error);
    throw error;
  }
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

export const getHostProfileByListingId = async (listingId) => {
  try {
    const response = await api.get(`listings/${listingId}/hostprofile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching host profile: ", error);
    throw error;
  }
};
