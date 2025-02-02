import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Use sessionStorage
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
// Persist configuration
const persistConfig = {
  key: "auth", 
  storage: sessionStorage,
  whitelist: ["user", "token", "isAuthenticated"], // Only persist these fields
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer, 
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these actions for serializable check (required for redux-persist)
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };