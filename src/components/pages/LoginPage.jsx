import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (result) {
      navigate("/");
    } else {
      setError("Either the username or the password is incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
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
        <div className="w-full max-w-[600px] mx-2 border border-gray-200 rounded-xl shadow-md p-12 max-[430px]:p-4 flex flex-col items-center bg-white mt-20 mb-16">
          {/* Top section */}
          <div className="w-full flex flex-col items-center mb-6">
            <span className="text-center text-lg font-semibold mb-2 mt-2 max-[430px]:text-base">
              Login to Your Account
            </span>

            {/* Login Form logo, same markup as top-left but larger */}
            <div className="rounded-full bg-red-400 text-white flex items-center justify-center mb-6 mt-2 w-[120px] h-[120px] text-[1.5rem]">
              Logo
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition-colors duration-200 mt-2"
            >
              Login
            </button>
          </form>

          {/* Links and text under Login Form */}
          <div className="flex flex-col items-center mt-4 text-sm text-gray-500 w-full">
            <div className="flex justify-center items-center w-full gap-2 mb-1">
              <span>Don't have an account?</span>
              <Link to="/register" className="text-red-400 hover:underline">
                Sign up
              </Link>
            </div>
            <span className="mt-1 text-xs text-gray-400 hover:underline cursor-not-allowed text-center">
              Forgot password?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
