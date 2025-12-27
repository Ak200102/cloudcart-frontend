// import { configureStore } from '@reduxjs/toolkit'
// import cloudCartReducer from './cloudCartSlice'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storageImport from 'redux-persist/lib/storage'


// const storage = storageImport?.default ?? storageImport

// const persistConfig = {
//   key: 'cloudCart',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, cloudCartReducer)

// export const store = configureStore({
//   reducer: {
//     cloudCart: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//         ],
//       },
//     }),
// })

// export const persistor = persistStore(store)
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageImport from 'redux-persist/lib/storage'
import cloudCartReducer from "./cloudCartSlice";
const storage = storageImport?.default ?? storageImport

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cloudCartReducer);

export const store = configureStore({
  reducer: {
    cloudCart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

