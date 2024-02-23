import { createSlice} from "@reduxjs/toolkit";
import { loginUser } from "../actions/authApi";



const userSlice = createSlice ({
  name: 'user',
  initialState: {
    user: null,
    isAutentificated: false,
    loading : false,
    error : null

  },
  reducers: {
    logoutUser: (state) => {
      state.isAutentificated = false;
      state.loading = false;
      state.error = null;
    },
    resetState: (state) => {
      state.user = null;
      state.isAutentificated = false;
      state.loading = false;
      state.error = null;
    }, 
  extraReducers : (builder) =>
  builder
  .addCase(loginUser.pending,(state)=>{
    state.user = null;
    state.isAutentificated = false;
    state.loading = true;
    state.error = null;
  })
  .addCase(loginUser.fulfilled, (state, action) => {
    if (action.payload.body) {
      state.user = action.payload.body.user;
      state.isAutentificated = true;
      state.loading = false;
      state.error = null;
    } else {
      console.error('Response body is undefined:', action.payload);
    }
})
  .addCase(loginUser.rejected, (state, action) => {
    state.user = null ;
    state.isAutentificated = false;
    state.loading = null;
    console.log('Rejected action error message:', action.error.message); // Ajoutez ce log pour examiner le contenu du message d'erreur
    state.error = action.payload.error.message;
  })
}
})



export const { logoutUser, resetState } = userSlice.actions;

export const selectUser = (state) => state.user.isAutentificated;

export default userSlice.reducer;
