// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import persistCurrentUserMiddleware from './middleware';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistCurrentUserMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
