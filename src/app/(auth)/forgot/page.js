'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleRequestReset = async () => {
    try {
      const res = await axios.post('http://localhost:8080/auth/forgot-password', { email });
      if (res.data.success) setStep(2);
    } catch (error) {
      console.error('Error requesting reset code:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post('http://localhost:8080/auth/reset-password', {
        email,
        code,
        password,
      });
      if (res.data.success) router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Reset Your Password
        </h2>
        {step === 1 ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter Your Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-2 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={handleRequestReset}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 mt-4"
            >
              Get Reset Code
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border rounded mt-2 bg-gray-200 dark:bg-gray-800 dark:text-white"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Enter Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-2 dark:bg-gray-800 dark:text-white"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-2 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md py-2 mt-4"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
