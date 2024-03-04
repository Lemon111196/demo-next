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
        getNoteListSuccess: (state, action: PayloadAction<INote[]>) => {
            state.loading = false;
            state.notes = action.payload;
        },
        createNoteSuccess: (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        },
        editNoteSuccess: (state, action: PayloadAction<{ id: string; updatedNote: INote }>) => {
            state.loading = false;
            const { id, updatedNote } = action.payload;
            const index = state.notes.findIndex((note) => note.id === id);
            if (index !== -1) {
                state.notes[index] = updatedNote;
            }
        },
        deleteNoteSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            const noteIdToDelete = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteIdToDelete);
        },
        resetNote: () => initialState,
    }
})

export const {
    getNoteListSuccess,
    createNoteSuccess,
    editNoteSuccess,
    deleteNoteSuccess,
    resetNote,
} = noteReducer.actions;

export default noteReducer.reducer;