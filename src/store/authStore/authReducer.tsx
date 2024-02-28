import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interface";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    registering: false,
    error: null,
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
        registerRequest: (state) => {
            state.registering = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.registering = false;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.registering = false;
            state.error = action.payload;
        },
    }
})

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;