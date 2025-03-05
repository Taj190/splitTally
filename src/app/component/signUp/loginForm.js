"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { loginUser } from "@/app/store/thunks/authThunk";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      if (response) router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
    setLoading(false);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form onSubmit={handleLogin} className="space-y-4 text-black dark:text-white">
    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
  
    <label className="block dark:text-white">Email</label>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  <div className="relative">
    <label className="block dark:text-white">Password</label>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <button
      type="button"
      onClick={handleTogglePasswordVisibility}
      className="absolute top-1/2 right-2 -translate-y-1/2 mt-2 flex items-center text-gray-500 dark:text-gray-300"
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </button>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  
    <div className="text-center text-sm mt-3">
      <Link href="/forgot" className="text-blue-500 hover:underline">
        Forgot password?
      </Link>
    </div>
  </form>
  
  
  );
}

