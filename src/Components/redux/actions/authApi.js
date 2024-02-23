import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleLoginError } from '../../utils/errorMessages';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

        // console.log('Response:', response); 

      if (response.ok) {
        const userData = await response.json();
        // console.log('Response Body:', userData); 
        sessionStorage.setItem('token', userData.body.token);
        return userData;
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        
        if (response.status === 400) {
          //console.log ( 'status de la réponse ', response.status)
          const errorMessage = handleLoginError(errorData);
          //console.log ( 'que contient errorData ', errorData)
          //console.log ( 'quest ce que contient errorMessage', errorMessage)
          throw new Error(errorMessage);

        }
      }
    } catch (error) {
      console.log('Error in catch block:', error); 
      return rejectWithValue({ message: 'Une erreur s\'est produite lors de la connexion', error });
    }
  }
);
