import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../reducers-slices/userSlice';



// RECUPERATION DES INFOS DE L'USER 
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
        
      const token = selectToken(getState())

      if (!token){
        throw new Error('Token not available');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: headers,
      });

      if (response.ok) {
        const userProfile = await response.json();
        return userProfile;
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred while fetching user profile', error });
    }
  }
);



// MODIFICATION ET ENRENGISTREMENT DE L'USERNAME


export const updateUsername = createAsyncThunk(
  'user/updateUsername',
  async (newUserName, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState());

      if (!token) {
        throw new Error('Token not available');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const bodyReq = {
        userName : newUserName,
      };

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT', 
        headers: headers,
        body: JSON.stringify(bodyReq),
      });

      console.log('Response from updateUsername:', response);

      if (response.ok) {
        const updatedUserNameProfile = await response.json();
        return updatedUserNameProfile;
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred while updating username', error });
    }
  }
);
