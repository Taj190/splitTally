'use client'; 

import { SessionProvider } from 'next-auth/react'; // For next-auth
import { Provider } from 'react-redux'; // For Redux
import { PersistGate } from 'redux-persist/integration/react'; // For redux-persist

import { ToastContainer } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import './globals.css'; // Your global styles
import { persistor, store } from './store';
import Navbar from './component/navbar/Navbar';

export default function RootLayout({ children }) {
  return (
    <html>
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
      </body>
    </html>
  );
}