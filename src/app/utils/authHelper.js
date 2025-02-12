"use client"
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../store/slices/authSlice';

export const useSaveUserData = (user, router) => {
  const [logoutTriggered, setLogoutTriggered] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (logoutTriggered) {
      setTimeout(() => {
        signOut();
        dispatch(logout());
      }, 3000);
    }
  }, [logoutTriggered, dispatch]);

  const saveUserData = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/user/sign-up',
        {
          name: user?.name,
          email: user?.email,
          googleId: user?.id,
          isGoogleSignUp: true,
        },
        {   headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`, // Add JWT here
        }, withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setLogoutTriggered(true);
    }
  }, [user, router, dispatch]); 


  return saveUserData;
};

export const handleGetCode = async (email, setCodeSent, toast) => {
    try {
      const response = await axios.post('http://localhost:8080/code/signUpcode', { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setCodeSent(true);
      }
     
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message); 
          } else {
            toast.error('Failed to send verification code. Please try again later.');
          }
    }
  };
  
  export const handleSignUp = async (formData, setFormData, router, toast) => {
    const { name, email, password, code, codeSent } = formData;
  
    if (!name || !email || !password || (codeSent && !code)) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/user/sign-up', {
        name,
        email,
        password,
        code,
        isGoogleSignUp: false,
      });
    
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', password: '', code: '', codeSent: false });
        router.push('/login');
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const validationErrors = error.response.data.errors;
            if (validationErrors) {
              validationErrors.forEach(err => {
                toast.error(err);
              });
            }
        }
        else {
            // Handle other errors
            toast.error('Something went wrong. Please try again.');
          }
    }
  };

  
  