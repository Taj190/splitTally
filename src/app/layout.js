"use client";

import { SessionProvider } from 'next-auth/react'; // For next-auth
import { Provider } from 'react-redux'; // For Redux
import { PersistGate } from 'redux-persist/integration/react'; // For redux-persist

import { ToastContainer } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import './globals.css'; // Your global styles
import { persistor, store } from './store';
import Navbar from './component/navbar/Navbar';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Footer = dynamic(() => import("./component/footer/footer"), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Basic Meta Tags */}
        <title>SplitTally - Simplify Shared Expenses</title>
        <meta name="description" content="SplitTally helps you manage shared expenses with roommates, friends, and family effortlessly. Track, split, and settle expenses with ease." />
        <meta name="keywords" content="expense tracker, split bills, shared expenses, roommates, group payments, SplitTally" />
        <meta name="author" content="SplitTally Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags (for social media sharing) */}
        <meta property="og:title" content="SplitTally - Simplify Shared Expenses" />
        <meta property="og:description" content="Easily track and split group expenses with SplitTally. Perfect for roommates, trips, and shared costs." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://splittally.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SplitTally - Simplify Shared Expenses" />
        <meta name="twitter:description" content="Easily track and split group expenses with SplitTally. Perfect for roommates, trips, and shared costs." />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://splittally.com" />
      </Head>
      
      <body>
        {/* Wrap your app with Redux Provider and PersistGate */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* Wrap your app with next-auth SessionProvider */}
            <SessionProvider>
               {/* Add Navbar here */}
               <Navbar />
              {children} {/* Your app content */}
              {/* Add ToastContainer here */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </SessionProvider>
          </PersistGate>
        </Provider>
        <Footer/>
      </body>
    </html>
  );
}
