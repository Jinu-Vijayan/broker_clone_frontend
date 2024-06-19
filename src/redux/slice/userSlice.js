import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        SIGNIN_START : (state) => {
            state.loading = true
        },
        SIGNIN_SUCCESS : (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false
        },
        SIGNIN_FAILE : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {SIGNIN_FAILE, SIGNIN_START, SIGNIN_SUCCESS} = userSlice.actions;

export default userSlice.reducer;