import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleLoginError } from '../../utils/errorMessages';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, {rejectWithValue }) => {
    const { rememberMe } = userCredentials;
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const userData = await response.json();

        if (!rememberMe) {
          // Stocker le token dans le local storage
          localStorage.setItem('userToken Local', userData.body.token);
        } else {
          // Si "Remember me" n'est pas activé, stocker le token dans le sessionStorage
          sessionStorage.setItem('userToken Session', userData.body.token);
          
        }

        return userData;
      } else {
        const errorData = await response.json();
       
        if (response.status === 400) {
          const errorMessage = handleLoginError(errorData);
          return rejectWithValue({ message: errorMessage });
        }
      }
    } catch (error) {
      return rejectWithValue({ message: 'Une erreur s\'est produite lors de la connexion', error });
    }
  }
);
