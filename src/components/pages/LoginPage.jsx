import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setError("Either the username or the password is incorrect.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-white font-sans"
      style={{ fontFamily: "Nunito Sans, sans-serif" }}
    >
      <div className="flex-1 flex justify-center items-center w-full h-full">
        <div className="w-full max-w-[600px] mx-2 border border-gray-200 rounded-xl shadow-md p-12 max-[430px]:p-4 flex flex-col items-center bg-white">
          
          
          {/* Top section */}
          <div className="w-full flex flex-col items-center mb-6">
            <span className="text-center text-lg font-semibold mb-2 mt-2 max-[430px]:text-base">
              Login to Your Account
            </span>


            {/* Logo */}
            <div
              className="rounded-full bg-red-400 text-white flex items-center justify-center mb-6 mt-2"
              style={{
                width: "120px",
                height: "120px",
                fontSize: "1.5rem",
              }}
            >
              Logo
            </div>
          </div>


          {/* Form */}
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
          <div className="flex flex-col items-center mt-4 text-sm text-gray-500 w-full">
            <div className="flex flex-col max-[430px]:flex-row max-[430px]:justify-between w-full">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="text-red-400 hover:underline ml-2"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </div>
            <button
              className="mt-1 text-xs text-gray-400 hover:underline"
              type="button"
              disabled
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
