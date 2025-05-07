import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UserRegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phoneNr: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
      country: "",
    }, //Thought this was my issue that i did not send it as an object but still getting an error message
    profilePictureURL: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Regex patterns, Do I even need these? Since they are already validated in the backend?
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  const phonePattern = /^[0-9+]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };  // this didn't help me neither with the error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Frontend validation, I think this is redundant since the backend already validates the data.
    if (!form.username || !form.password || !form.email || !form.phoneNr) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!passwordPattern.test(form.password)) {
      setError(
        "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }
    if (!phonePattern.test(form.phoneNr)) {
      setError("Phone number may only contain numbers and +");
      return;
    }
    // Email validation, I think this is redundant since the backend already validates the data.
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Email does not have a valid format.");
      return;
    }

    // Registration payload
    const payload = {
      ...form,
      roles: ["USER"],
    };

    try {
      await register(payload);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        "Registration failed. Please check your details or try a different username/email/phone."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans relative">
      {/* Top-left logo as a Link */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-10"
        aria-label="Go to Home"
      >
        <div className="rounded-full bg-red-400 text-white flex items-center justify-center w-[48px] h-[48px] text-[1rem]">
          Logo
        </div>
      </Link>
      <div className="flex-1 flex justify-center items-center w-full h-full">
        <div className="w-full max-w-[600px] mx-2 border border-gray-200 rounded-xl shadow-md p-12 max-[430px]:p-4 flex flex-col items-center bg-white">
          {/* Top section */}
          <div className="w-full flex flex-col items-center mb-6">
            <span className="text-center text-lg font-semibold mb-2 mt-2 max-[430px]:text-base">
              Create an Account
            </span>

            {/* Form logo, same markup as top-left but larger */}
            <div className="rounded-full bg-red-400 text-white flex items-center justify-center mb-6 mt-2 w-[120px] h-[120px] text-[1.5rem]">
              Logo
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              name="username"
              placeholder="Username *"
              value={form.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              required
            />
            <input
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              required
            />
            <input
              name="phoneNr"
              placeholder="Phone Number *"
              value={form.phoneNr}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
              required
            />
            {/* Address fields (newly added) */}
            <input
              name="address.street"
              placeholder="Street"
              value={form.address.street}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="address.zipCode"
              placeholder="Zip Code"
              value={form.address.zipCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="address.city"
              placeholder="City"
              value={form.address.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="address.country"
              placeholder="Country"
              value={form.address.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="profilePictureURL"
              placeholder="Profile Picture URL"
              value={form.profilePictureURL}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-sm text-center">
                Registration successful! Redirecting to login...
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-2"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-sm flex flex-col items-center w-full">
            <span>Already have an account?</span>
            <Link to="/login" className="text-red-400 hover:underline mt-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistrationPage;
