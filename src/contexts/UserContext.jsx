import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";

// Create a new context for user data
export const UserContext = createContext();

export function UserProvider({ children }) {
  // Get the current user from auth context
  const { currentUser } = useAuth();
  // State to store the user's profile data
  const [userProfile, setUserProfile] = useState(null);
  // State to track if we're loading data
  const [loading, setLoading] = useState(true);
  // State to store any errors that occur
  const [error, setError] = useState(null);

  // This effect runs whenever the currentUser changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      // If there's no current user, clear the profile and stop loading
      if (!currentUser) {
        console.log("No currentUser, skipping profile fetch");
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        // Fetch the user's profile data from the backend
        console.log("Fetching user profile for user:", currentUser);
        const response = await api.get("/users");
        console.log("Raw Profile API response:", response.data);
        console.log("Response data type:", typeof response.data);
        console.log("Response data keys:", Object.keys(response.data));

        // The backend returns address data in a nested object
        // We need to extract it to use in our frontend
        const address = response.data.address || {};
        console.log("Extracted address object:", address);

        // Combine the current user data with the profile data
        // This ensures we have all the information we need
        const mergedProfile = {
          ...currentUser,
          ...response.data,
          // Use email from profile data if available, otherwise use current user's email
          email: response.data.email || currentUser.email || "",
          // Get address fields from the nested address object
          street: address.street || "",
          zipCode: address.zipCode || "",
          city: address.city || "",
          country: address.country || "",
        };

        console.log("Final merged profile data:", mergedProfile);
        setUserProfile(mergedProfile);
        setError(null);
      } catch (err) {
        // If there's an error, show it and use current user data as fallback
        console.error("Error fetching user profile:", err);
        console.error("Error details:", err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch user profile");
        setUserProfile(currentUser);
      } finally {
        // Always stop loading when we're done
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  // Function to update the user's profile
  const updateProfile = async (profileData) => {
    try {
      console.log("Updating profile with data:", profileData);

      // Structure the data to match what the backend expects
      // The backend wants address fields in a nested object
      const updateData = {
        email: profileData.email,
        phoneNr: profileData.phoneNr,
        address: {
          street: profileData.street,
          zipCode: profileData.zipCode,
          city: profileData.city,
          country: profileData.country,
        },
      };

      console.log("Structured update data:", updateData);
      // Send the update to the backend
      const response = await api.put("/users", updateData);
      console.log("Profile update response:", response.data);

      // Extract the address data from the response
      const address = response.data.address || {};
      console.log("Extracted address from response:", address);

      // Update our local state with the new data
      setUserProfile((prev) => {
        const updatedProfile = {
          ...prev,
          ...response.data,
          // Use email from response if available, otherwise keep the old one
          email: response.data.email || prev.email || "",
          // Get address fields from the nested address object
          street: address.street || "",
          zipCode: address.zipCode || "",
          city: address.city || "",
          country: address.country || "",
        };
        console.log("Updated profile state:", updatedProfile);
        return updatedProfile;
      });

      return response.data;
    } catch (err) {
      // If there's an error, log it and throw it to be handled by the component
      console.error("Error updating profile:", err);
      console.error("Error details:", err.response?.data);
      throw new Error(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  };

  // The value that will be available to all components using this context
  const value = {
    userProfile,
    updateProfile,
    loading,
    error,
    setError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
