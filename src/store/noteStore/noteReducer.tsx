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
        getNoteListSuccess: (state, action: PayloadAction<INote[]>) => {
            state.loading = false;
            state.notes = action.payload;
        },
        createNoteSuccess: (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        },
        // editNoteSuccess: (state, action: PayloadAction<{ id: string; updatedNote: INote }>) => {
        //     state.loading = false;
        //     const { id, updatedNote } = action.payload;
        //     const index = state.notes.findIndex((note) => note._id === id);
        //     if (index !== -1) {
        //         state.notes[index] = updatedNote;
        //     }
        // },
        updateNoteSuccess: (state, action) => {
            state.notes = state.notes.map((item) => {
              if (item._id === action.payload._id) {
                return action.payload;
              } else {
                return item;
              }
            });
          },
        deleteNoteSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.notes = state.notes.filter(note => note._id !== action.payload);
        },
        resetNote: () => initialState,
    }
})

export const {
    getNoteListSuccess,
    createNoteSuccess,
    updateNoteSuccess,
    deleteNoteSuccess,
    resetNote,
} = noteReducer.actions;

export default noteReducer.reducer;