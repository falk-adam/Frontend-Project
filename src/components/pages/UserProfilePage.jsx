/*UserProfilePage:
This page shows and lets users edit their profile information.
It uses the UserContext to get and update the user's data.*/

import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  // Get user data and functions from our contexts
  const { userProfile, updateProfile, loading, error, setError } = useUser();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State to store the form data while editing
  const [formData, setFormData] = useState({
    email: userProfile?.email || "",
    street: userProfile?.street || "",
    zipCode: userProfile?.zipCode || "",
    city: userProfile?.city || "",
    country: userProfile?.country || "",
    phoneNr: userProfile?.phoneNr || "",
  });

  // Update form data when userProfile changes
  useEffect(() => {
    console.log("UserProfile changed:", userProfile);
    if (userProfile) {
      const newFormData = {
        email: userProfile.email || "",
        street: userProfile.street || "",
        zipCode: userProfile.zipCode || "",
        city: userProfile.city || "",
        country: userProfile.country || "",
        phoneNr: userProfile.phoneNr || "",
      };
      console.log("Setting new form data:", newFormData);
      setFormData(newFormData);
    }
  }, [userProfile]);

  // State to show success message after update
  const [success, setSuccess] = useState("");

  // Function to start editing
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to cancel editing and reset form
  const handleCancel = () => {
    setFormData({
      email: userProfile?.email || "",
      street: userProfile?.street || "",
      zipCode: userProfile?.zipCode || "",
      city: userProfile?.city || "",
      country: userProfile?.country || "",
      phoneNr: userProfile?.phoneNr || "",
    });
    setIsEditing(false);
    setError(null);
    setSuccess("");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    try {
      // Try to update the profile
      await updateProfile(formData);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading profile data...
      </div>
    );
  }

  // Don't show anything if user is not logged in (will redirect)
  if (!currentUser) {
    return null;
  }

  // Show loading state while profile is being fetched
  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading user profile...
      </div>
    );
  }

  // Helper function to check if any address fields are filled
  const hasAddress =
    userProfile.street ||
    userProfile.zipCode ||
    userProfile.city ||
    userProfile.country;

  // Helper function to format address for display
  const formatAddress = () => {
    const parts = [];
    if (userProfile.street) parts.push(userProfile.street);
    if (userProfile.zipCode) parts.push(userProfile.zipCode);
    if (userProfile.city) parts.push(userProfile.city);
    if (userProfile.country) parts.push(userProfile.country);
    return parts.length > 0 ? parts.join(", ") : "Not set";
  };

  // Show edit form if in editing mode
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Profile
        </h1>

        {/* Show error message if there is one */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Show success message if update was successful */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Edit form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field (read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={userProfile.username}
              disabled={true}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNr"
              value={formData.phoneNr}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Address fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              disabled={loading}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Form buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Show profile view if not in editing mode
  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Profile
      </h1>

      {/* Show error message if there is one */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Show success message if update was successful */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Profile information display */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Information
          </h2>

          <div className="space-y-4">
            {/* Display username */}
            <div className="py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Username:</span>{" "}
              <span className="text-gray-800">{userProfile.username}</span>
            </div>

            {/* Display user roles */}
            <div className="py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Roles:</span>{" "}
              <span className="text-gray-800">
                {userProfile.roles?.join(", ")}
              </span>
            </div>

            {/* Display email */}
            <div className="py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Email:</span>{" "}
              <span className="text-gray-800">
                {userProfile.email || "Not set"}
              </span>
            </div>

            {/* Display phoneNr */}
            <div className="py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Phone Number:</span>{" "}
              <span className="text-gray-800">
                {userProfile.phoneNr || "Not set"}
              </span>
            </div>

            {/* Display formatted address */}
            <div className="py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Address:</span>{" "}
              <span className="text-gray-800">{formatAddress()}</span>
            </div>
          </div>
        </div>

        {/* Edit profile button */}
        <button
          onClick={handleEdit}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
}

export default UserProfilePage;
