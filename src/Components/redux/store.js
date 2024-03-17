import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers-slices/userSlice';
import profileReducer from './reducers-slices/profileSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
