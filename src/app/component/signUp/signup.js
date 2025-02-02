import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { handleGetCode, handleSignUp } from '@/app/utils/authHelper';
import { FcGoogle } from 'react-icons/fc';

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', code: '', codeSent: false });
  const { name, email, password, code, codeSent } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCodeRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    await handleGetCode(email, (status) => setFormData({ ...formData, codeSent: status }), toast);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignUp(formData, setFormData, router, toast);
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn('google', {
        redirect: false,
        callbackUrl: window.location.origin,
      });
    } catch (error) {
      console.error('Error during Google Sign-Up:', error);
      toast.error('Something went wrong with Google Sign-Up.');
    }
  };

  return (
    <div className="space-y-6">
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your name"
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Get Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          name="code"
          value={code}
          onChange={handleInputChange}
          placeholder="Enter code"
          className="flex-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleCodeRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
        >
          Get Code
        </button>
      </div>
    </div>
    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md py-2">
      Sign Up
    </button>
  </form>

  <div className="relative mt-4">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
        Or continue with
      </span>
    </div>
  </div>

  <button
    onClick={handleGoogleSignUp}
    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2 flex items-center justify-center"
  >
    <FcGoogle className="mr-2 text-xl" /> Sign in with Google
  </button>

  <div className="mt-4 text-center">
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Already have an account?{' '}
      <a
        onClick={() => router.push('/login')}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Log in
      </a>
    </p>
  </div>
</div>

  );
};

export default SignUpForm;