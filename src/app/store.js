// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer, // Integrating the crypto reducer
  },
});

export default store;
