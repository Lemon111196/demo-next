import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interface";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}

const AuthReducer = createSlice({
    name: "AuthReducer",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    }
})

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;