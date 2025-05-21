import api from "./axios";

//ListingService
//connects to "/listings/**"-backend endpoints

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

//get single listing by listing id
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

//get host profile (incl. username, profile picture and description)
export const getHostProfileByListingId = async (listingId) => {
  try {
    const response = await api.get(`listings/${listingId}/hostprofile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching host profile: ", error);
    throw error;
  }
};

//get listings current user
export const getMyListings= async () => {
  try {
    const response = await api.get(`/listings/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings current user: ", error);
    throw error;
  }
};