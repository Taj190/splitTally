"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {  useSaveUserData } from './utils/authHelper';
import SignUpForm from './component/signUp/signup';
import { useDispatch } from 'react-redux';
import { googleLogin } from './store/slices/authSlice'; // Import the new action

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const saveUser = useSaveUserData(session?.user, router);
  useEffect(() => {
    if (!session?.user) return;
    if (session?.user) {
      saveUser()
      dispatch(
        googleLogin({
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
          token: session?.accessToken || session?.user?.accessToken, // Ensure token is available
        })
      );
    }
  }, [session, router, dispatch ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
