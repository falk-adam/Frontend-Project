import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UserRegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phoneNr: "",
    //Change address and remove object and only using strings test v3
    street: "",
    zipCode: "",
    city: "",
    country: "",
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
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      username: form.username,
      password: form.password,
      email: form.email,
      phoneNr: form.phoneNr,
      street: form.street,
      zipCode: form.zipCode,
      city: form.city,
      country: form.country,
      profilePictureURL: form.profilePictureURL,
      description: form.description,
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

            {/* Register Form logo, same markup as top-left but larger */}
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
            {/* Address fields (v2) */}
            <input
              name="street"
              placeholder="Street"
              value={form.street}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="zipCode"
              placeholder="Zip Code"
              value={form.zipCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
            />
            <input
              name="country"
              placeholder="Country"
              value={form.country}
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
