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
      navigate("/user");
    } catch {
      console.log("error" + error);
    }
  };

  return (
    <div className="bg-gray-400 w-full flex flex-col gap-2 justify-center items-center p-10">
      <h2 className="text-xl">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col gap-2 justify-center items-center"
      >
        <label htmlFor="username">Username</label>
        <input
          className="w-100 border bg-white"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="w-100 border bg-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black rounded-sm text-white px-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
