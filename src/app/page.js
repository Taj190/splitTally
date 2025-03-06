"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSaveUserData } from './utils/authHelper';
import SignUpForm from './component/signUp/signup';
import HeroSection from './component/herosection/hero';
import AboutSection from './component/about/about';
import PhotoLoopComponent from './component/Displayphotos/photos';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const saveUser = useSaveUserData(session?.user, router);
  
  useEffect(() => {
    if (session?.user) {
      saveUser();
    }
  }, [session, router, saveUser]);

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>SplitTally - Simplify Shared Expenses</title>
        <meta name="description" content="SplitTally helps you manage shared expenses with roommates, friends, and family effortlessly. Track, split, and settle expenses with ease." />
        <meta name="keywords" content="expense tracker, split bills, shared expenses, roommates, group payments, SplitTally" />
        <meta name="author" content="SplitTally Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags (for social media sharing) */}
        <meta property="og:title" content="SplitTally - Simplify Shared Expenses" />
        <meta property="og:description" content="Easily track and split group expenses with SplitTally. Perfect for roommates, trips, and shared costs." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://splittally.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SplitTally - Simplify Shared Expenses" />
        <meta name="twitter:description" content="Easily track and split group expenses with SplitTally. Perfect for roommates, trips, and shared costs." />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://splittally.com" />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
        <HeroSection />
      </div>

      {/* About Section */}
      <div>
        <AboutSection />
      </div>

      <PhotoLoopComponent />
    </>
  );
}
