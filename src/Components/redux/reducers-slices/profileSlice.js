import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../actions/userAction";

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        data :  null,
        loading: false,
        error: null,
        editUserInfoOff: false,
    },
    reducers: {
        clearProfile: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
    },
        toggleEditUserInfoState : (state ) => {
        state.editUserInfoOff = true;
    },

},
extraReducers : (builder) => {
    builder
    .addCase(getUserProfile.pending, (state) =>{
        state.loading = true;
        state.error =null;
    })
    .addCase(getUserProfile.fulfilled, (state,action) => {
        state.data = action.payload.body;
        state.loading = false;
        state.error = null;
    })
    .addCase(getUserProfile.rejected, (state, action) => {
        state.data=null;
        state.loading = false;
        state.error= action.payload?.message|| "An error occurred while fetching user profile.";
    })
    }
})

export const {clearProfile, toggleEditUserInfoState, resetEditUserInfoState} = profileSlice.actions;

export const selectProfile =(state) => state.profile.data;
export const selectEditUserInfoOff = (state) => state.profile.editUserInfoOff;
    
export default profileSlice.reducer;