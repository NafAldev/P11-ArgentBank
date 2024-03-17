import { createSlice} from "@reduxjs/toolkit";
import { loginUser } from "../actions/authAction";



const userSlice = createSlice ({
  name: 'user',
  initialState: {
    user: null,
    isAuthentificated: false,
    loading : false,
    error : null,
    token : null,
    rememberMe : false,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthentificated = false;
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null;
      state.rememberMe = false;

    },
    setRememberMe : (state, action) => {
      state.rememberMe = action.payload;
      
    }
  },
  extraReducers : (builder) =>
  builder
  .addCase(loginUser.pending,(state)=>{
    state.user = null;
    state.isAuthentificated = false;
    state.loading = true;
    state.error = null;
    
  })
  .addCase(loginUser.fulfilled,(state, action) => {
      state.user = action.payload.body;
      state.isAuthentificated = true;
      state.loading = false;
      state.error = null;
      state.token = action.payload.body.token;
      if (state.rememberMe) {
        localStorage.setItem('token', state.token);
      }

  })
  .addCase(loginUser.rejected, (state, action) => {
    state.user = null ;
    state.isAuthentificated = false;
    state.loading = null;
    state.error = action.payload?.message || "An error occurred during login.";
  })
})

export const { logoutUser, setRemember } = userSlice.actions;

export const selectUser = (state) => state.user.isAuthentificated;
export const selectToken =(state) => state.user.token;

export default userSlice.reducer;
