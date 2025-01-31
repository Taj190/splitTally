"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { loginUser } from "@/app/store/thunks/authThunk";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      if (response) router.push("/about");
    } catch (err) {
      setError(err.message || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 text-black">
    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
  
    <label className="block text-black">Email</label>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
      required
    />
  
    <label className="block text-black">Password</label>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
      required
    />
  
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  
    <div className="text-center text-sm mt-3">
      <Link href="/forgot-password" className="text-blue-500 hover:underline">
        Forgot password?
      </Link>
    </div>
  </form>
  
  );
}

