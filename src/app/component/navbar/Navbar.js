import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toggleMode } from '@/app/store/slices/themeSlice';
import { signOut, useSession } from 'next-auth/react';
import { logout } from '@/app/store/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { data: session, status } = useSession(); 
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === 'dark';
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = async () => {
      try {
       
        if (session) {
          await signOut({ redirect: false }); // Google logout
        } 
        else{
          try {
          const res =  await axios.post('http://localhost:8080/auth/logout',{}, { 
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
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">SplitTally</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleMode }
          className="p-2 bg-gray-700 rounded-full"
        >
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
        </button>
        {(isAuthenticated || session )? (
          <button
            onClick={handleLogout }
            className="px-4 py-2 bg-red-500 rounded"
          >
            Logout
          </button>
        ) 
        :(
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-green-500 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
