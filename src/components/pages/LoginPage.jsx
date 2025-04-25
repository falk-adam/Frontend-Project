/*LoginPage:
Page with input form for login credentials*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
    } catch {
      console.log("error" + error);
    }
  };

  return (
    <div className="bg-gray-500 w-100% p-4 items-center justify-center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="mx-2 mb-3 rounded bg-gray-800 p-4">
          <label for="username" class="text-white">
            Enter your username here:
          </label>
          <input
            class="w-full bg-gray-800 py-2 text-xs text-gray-50 outline-none"
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <div class="mx-2 mb-3 rounded bg-gray-800 p-4">
          <label for="username" class="text-white">
            Enter your password here:
          </label>
          <input
            class="w-full bg-gray-800 py-2 text-xs text-gray-50 outline-none"
            id="password"
            type="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
