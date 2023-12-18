import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signup: (state,action) => {
            state.user = action.payload;
        },
        login: (state,action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    },
})

export const {signup, login, logout} = userSlice.actions;
export default userSlice.reducer;
