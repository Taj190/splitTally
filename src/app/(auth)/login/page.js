"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "../../component/signUp/loginForm";
import Link from "next/link";
import { useSaveUserData } from "@/app/utils/authHelper";



export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
 const saveUser = useSaveUserData(session?.user, router);
  useEffect(() => {
    if (session?.user) {
      saveUser()
     
    }
  }, [session, router , saveUser ]);

  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", { redirect: false });
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Login</h2>
      <LoginForm /> {/* Using the extracted LoginForm component */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-500"></div>
        <span className="mx-2 text-gray-500 dark:text-gray-300">OR</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-500"></div>
      </div>
      <button
        onClick={handleGoogleSignUp}
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2 flex items-center justify-center"
      >
        <FcGoogle className="mr-2 text-xl" /> Sign in with Google
      </button>
      <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link href="/" className="text-blue-500 hover:underline dark:text-blue-400">Sign up</Link>
      </p>
    </div>
  </div>
  
  );
}
