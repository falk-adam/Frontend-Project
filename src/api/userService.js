import api from "./axios";

//UserService
//connects to "/users/**"-backend endpoints

//get favorited listings for current user
export const getMyFavorites = async () => {
  try {
    const response = await api.get(`/users/favorites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite listings: ", error);
    throw error;
  }
};

//add or remove favorited listings for current user by listing id (if already in favorites: remove, else: add listing)
export const addOrRemoveFavorite = async (listingId) => {
  try {
    const response = await api.patch(`/users/favorites/${listingId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding/remocing favorite listing: ", error);
    throw error;
  }
};
