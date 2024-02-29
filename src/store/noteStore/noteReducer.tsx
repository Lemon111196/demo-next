import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, INote } from "./interface";

const initialState: IForm = {
    loading: false,
    notes: [],
    error: null ,
}

const noteReducer = createSlice({
    name: "noteReducer",
    initialState,
    reducers: {
        getNoteListRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getNoteListSuccess: (state, action: PayloadAction<INote[]>) => {
            state.loading = false;
            state.notes = action.payload;
        },
        getNoteListFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
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
        editNoteRequest: (state) => {
            state.loading = false;
            state.error = null;
        },
        editNoteSuccess: (state, action: PayloadAction<{ id: string; updatedNote: INote }>) => {
            state.loading = false;
            const { id, updatedNote } = action.payload;
            const index = state.notes.findIndex((note) => note.id === id);
            if (index !== -1) {
                state.notes[index] = updatedNote;
            }
        },
        editNoteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteNoteRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteNoteSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            const noteIdToDelete = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteIdToDelete);
        },
        deleteNoteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetNote: () => initialState,
    }
})

export const {
    getNoteListRequest,
    getNoteListSuccess,
    getNoteListFailure,
    createNoteSuccess,
    createNoteRequest,
    createNoteFailure,
    editNoteRequest,
    editNoteSuccess,
    editNoteFailure,
    deleteNoteRequest,
    deleteNoteSuccess,
    deleteNoteFailure,
    resetNote,
} = noteReducer.actions;

export default noteReducer.reducer;