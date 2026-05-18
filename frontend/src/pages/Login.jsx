import {
  useContext,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(
      AuthContext
    );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await axios.post(
            "https://exquisite-gems-erp.onrender.com/api/auth/login",
            {
              email,
              password,
            }
          );

        login(
          response.data
            .token,

          response.data
            .user
        );

        navigate("/");
      } catch (error) {
        console.log(error);

        alert(
          error?.response
            ?.data?.error ||
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] border border-[#dfe5ea] p-8 shadow-sm">
        <h1 className="text-4xl font-black text-[#1f2933]">
          ERP Login
        </h1>

        <p className="text-[#7b8794] mt-2">
          Login to access
          inventory system
        </p>

        <form
          onSubmit={
            handleLogin
          }
          className="mt-8 space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full text-[#31475a] bg-[#f8fafb] border border-[#dfe5ea] rounded-[18px] px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full text-[#31475a]  bg-[#f8fafb] border border-[#dfe5ea] rounded-[18px] px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-[#31475a] hover:bg-[#3d556b] text-white py-4 rounded-[18px] font-bold transition-all"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;