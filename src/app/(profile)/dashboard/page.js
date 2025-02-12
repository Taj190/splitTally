'use client';
import CreateGroupButton from '@/app/component/Groupcreation/GroupCreationBtn';
import GroupList from '@/app/component/Groupcreation/GroupList';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

export default function Home() {
  const { data: session, status } = useSession(); // Google Auth
  const user = useSelector((state) => state.auth.user); // Redux state for email/password auth
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // Check if user is logged in via Redux

  if (status === 'loading') {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  if (status !== 'authenticated' && !isLoggedIn) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    {/* Welcome Section */}
    <div className="w-full max-w-4xl flex flex-col justify-center items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-xl sm:text-2xl font-semibold text-center">
        Welcome to SplitTally, {session?.user?.name || user.name}!
      </h1>
    </div>
  
    {/* Group List Section */}
    <div className="w-full md:w-1/3 max-w-sm p-4 mt-6">
      <GroupList />
    </div>
  </div>
  

  
  );
}
