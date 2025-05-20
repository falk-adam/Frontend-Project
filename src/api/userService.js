import api from "./axios";

export const getMyFavorites = async () => {
  try {
    const response = await api.get(`/users/favorites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite listings: ", error);
    throw error;
  }
};

export const addOrRemoveFavorite = async (listingId) => {
  try {
    const response = await api.patch(`/users/favorites/${listingId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding/remocing favorite listing: ", error);
    throw error;
  }
};
