import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interface";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    register: false,
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
        setRegister: (state, action: PayloadAction<boolean>) => {
            state.register = action.payload;
        },
        setRegisterError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }
})

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;