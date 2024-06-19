import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";

const store = configureStore({
    reducer : {
        user: userReducer
    },
    middleware : (getDefalutMiddleware) => getDefalutMiddleware({
        serializableCheck : false
    })
});

export default store;
