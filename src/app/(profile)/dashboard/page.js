'use client';

import CreateGroupButton from '@/app/component/Groupcreation/GroupCreationBtn';
import { logout } from '@/app/store/slices/authSlice';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const { data: session, status } = useSession(); // Google Auth
  const user = useSelector((state) => state.auth.user); // Redux state for email/password auth
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // Check if user is logged in via Redux
  
  const dispatch = useDispatch();
  const router = useRouter();

  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // If no session from NextAuth and not authenticated via Redux, redirect to login
  if (status !== 'authenticated' && !isLoggedIn) {
    return <p>You are not logged in.</p>;
  }

  const handleLogout = async () => {
    try {
      if (session) {
        await signOut({ redirect: false }); // Google logout
      }
      dispatch(logout()); // Redux logout
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Welcome to the App</h1>
        <CreateGroupButton/>
      {/* Show Google user details if logged in via Google */}
      {session && (
        <>
          <p>Name: {session.user.name}</p>
        
        </>
      )}

      {/* Show Redux user details if logged in via email/password */}
      {!session && isLoggedIn && user && (
        <>
          <p>Name: {user.name}</p>
       
        </>
      )}

      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Sign Out
      </button>
    </div>
  );
}