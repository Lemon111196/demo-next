import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./interface";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',

})