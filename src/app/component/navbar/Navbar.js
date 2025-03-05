import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toggleMode } from '@/app/store/slices/themeSlice';
import { signOut, useSession } from 'next-auth/react';
import { logout } from '@/app/store/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession(); 
 
  const user = useSelector((state) => state.auth.user); // Redux state for email/password auth
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); 
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === 'dark';
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [dropdownOpen , setDropdownOpen]= useState(false);
    const handleLogout = async () => {
      try {
       
        if (session) {
          await signOut({ redirect: false });
          router.push('/'); 
        } 
        else{
          try {
          const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{}, { 
         withCredentials: true  // Ensures cookies are sent
            });

            if(res.data.success){
              toast.success(res.data.message)
              dispatch(logout())
              router.push('/');
            }

          } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
          }
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
    const handleToggleMode = () => {
      dispatch(toggleMode());
      if (isDarkMode) {
        document.documentElement.classList.remove('dark'); // Remove dark mode
      } else {
        document.documentElement.classList.add('dark'); // Enable dark mode
      }
    };

  return (
<nav className="sticky top-0 flex justify-between items-center p-4 bg-gray-800 text-white z-50">
  <h1 className="text-xl font-bold">SplitTally</h1>
  <div className="flex items-center gap-4">
    <button
      onClick={handleToggleMode}
      className="p-2 bg-gray-700 rounded-full"
    >
      {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
    </button>
    <button
      onClick={() => router.push('/')} 
      className="px-4 py-2 bg-transparent border border-white rounded text-white hover:bg-white hover:text-gray-800 transition-colors"
    >
      Home
    </button>
    {(isAuthenticated || session) ? (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-4 py-2 bg-gray-700 rounded text-white"
        >
          {session?.user?.name || user.name} ▼
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded shadow-lg">
            <button
              onClick={() => router.push('/dashboard')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <button
        onClick={() => router.push('/login')}
        className="px-4 py-2 bg-transparent border border-white rounded text-white hover:bg-white hover:text-gray-800 transition-colors"
      >
        Login
      </button>
    )}
  </div>
</nav>



  );
};

export default Navbar;
