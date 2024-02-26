import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, INote } from "./interface";

const initialState: IForm = {
    loading: false,
    notes: [],
    error: null,
}

const noteReducer = createSlice({
    name: "noteReducer",
    initialState,
    reducers: {
        createNoteRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createNoteSuccess: (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        },
        createNoteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetNote: () => initialState,

    }
})

export const { createNoteSuccess, createNoteRequest, createNoteFailure, resetNote } = noteReducer.actions;

export default noteReducer.reducer;