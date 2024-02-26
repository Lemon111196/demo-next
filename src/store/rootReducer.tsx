import { combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./noteStore/noteReducer";
import authReducer from "./authStore/authReducer";


export const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
});
