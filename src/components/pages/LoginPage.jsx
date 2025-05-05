/*LoginPage:
Page with input form for login credentials*/

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
        <div className="w-[600px] max-w-full border border-gray-200 rounded-xl shadow-md p-12 flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-center text-sm font-semibold mb-2 mt-2">
              Login to Your Account
            </span>
            <svg
              width="70"
              height="70"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 mt-2"
            >
              <path
                d="M16 3C10.477 3 6 7.477 6 13c0 3.866 2.239 7.163 5.5 8.938V27a2 2 0 002 2h5a2 2 0 002-2v-5.062C23.761 20.163 26 16.866 26 13c0-5.523-4.477-10-10-10z"
                stroke="#EA5C5A"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
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
                placeholder="Placeholder text"
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
                placeholder="Placeholder text"
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
              Sign in
            </button>
          </form>
          <div className="flex flex-col items-center mt-4 text-sm text-gray-500 w-full">
            <div className="flex justify-between w-full">
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
