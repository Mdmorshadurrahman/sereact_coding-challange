import { configureStore } from '@reduxjs/toolkit';
import { counterApi } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [counterApi.reducerPath]: counterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterApi.middleware),
});
