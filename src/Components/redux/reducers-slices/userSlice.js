import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Axios from "axios";



export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredentials)=> {
      const request = await Axios.post("http://localhost:3001/api/v1/user/login", userCredentials)
      const response = await request.data.data;
      localStorage.setItem('user', JSON.stringify(response));
      return response;

  }
)
 

const userSlice = createSlice ({
  name: 'user',
  initialState: {
    user: null,
    isAutentificated: false
  },
  extraReducers : (builder) =>
  builder
  .addCase(loginUser.pending,(state)=>{
    state.user = null;
    state.isAutentificated = false;
  })
  .addCase(loginUser.fulfilled,(state,action)=>{
    state.user = action.payload ;
    console.log(action.payload);
    state.isAutentificated = true;
  })
  .addCase(loginUser.rejected,(state,action)=> {
    state.user = null ;
    state.isAutentificated = false;
    console.log(action.error.message);
    if ( action.error.message === 'Echec de la connexion'){
      state.error = 'Accès refusé ! Identifiants invalides '
    } else {
      state.error = action.error.message; 
    }
  })
});
 

// console.log(userSlice);


export default userSlice.reducer;
