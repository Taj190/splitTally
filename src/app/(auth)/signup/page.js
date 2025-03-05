"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSaveUserData } from '@/app/utils/authHelper';
import SignUpForm from '@/app/component/signUp/signup';


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const saveUser = useSaveUserData(session?.user, router);
  useEffect(() => {
    if (session?.user) {
      saveUser()
     
    }
  }, [session, router  , saveUser ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
    <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Sign Up</h1>
      <SignUpForm />
    </div>
  </div>
  
  );
}