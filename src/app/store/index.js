import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Use sessionStorage
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import groupReducer from './slices/groupListSlice'
// Persist configuration
const persistConfig = {
  key: "auth", 
  storage: sessionStorage,
  whitelist: ["user", "isAuthenticated"], // Only persist these fields
};

const groupPersistConfig = {
  key: "groups",
  storage: sessionStorage,
  whitelist: ["groups"], 
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedGroupReducer = persistReducer(groupPersistConfig, groupReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer, 
    theme: themeReducer,
    groups :persistedGroupReducer
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