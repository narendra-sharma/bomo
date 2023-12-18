import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Reducer/userSlice";

export default configureStore({
    reducer:{
        user: userSlice,
    }
})
