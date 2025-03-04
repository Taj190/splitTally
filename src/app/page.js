"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {  useSaveUserData } from './utils/authHelper';
import SignUpForm from './component/signUp/signup';
import HeroSection from './component/herosection/hero';
import AboutSection from './component/about/about';
import PhotoLoopComponent from './component/Displayphotos/photos';


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const saveUser = useSaveUserData(session?.user, router);
  useEffect(() => {
    if (session?.user) {
      saveUser()
     
    }
  }, [session, router ]);

  return (
    <div>
    {/* Hero Section */}
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
      <HeroSection />
    </div>

    {/* About Section */}
    <div>
      <AboutSection />
    </div>
    <PhotoLoopComponent/>
  </div>
  
  );
}