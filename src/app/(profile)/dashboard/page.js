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
    <div className="min-h-screen p-6 flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    {/* Left Sidebar - Group List */}
  
    {/* Main Dashboard Content */}
    <div className="flex-1 flex flex-col justify-start items-center p-4">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center sm:text-left">
          Welcome to SplitTally, {session ? session.user.name : user?.name}!
        </h1>
  
        <div className="mt-4 sm:mt-0">
          <CreateGroupButton />
        </div>
      </div>
    </div>

    <div className="w-full md:w-1/3 max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-y-auto">
      <GroupList />
    </div>
  </div>
  
  );
}
