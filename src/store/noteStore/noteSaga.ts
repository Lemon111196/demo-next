// noteSagas.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getNoteListRequest,
  getNoteListSuccess,
  getNoteListFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  editNoteRequest,
  editNoteSuccess,
  editNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
} from './noteReducer';
import { apiService } from '@/src/services';
import { PayloadAction } from '@reduxjs/toolkit';
import { INote } from './interface';

// Worker sagas
function* getNoteList(): Generator<any, void, any> {
  try {
    const response = yield call(apiService.get, 'note/list');
    yield put(getNoteListSuccess(response.data.note));
  } catch (error: any) {
    yield put(getNoteListFailure(error.message));
  }
}

function* createNote(action: PayloadAction<INote>): Generator<any, void, any> {
  try {
    const response = yield call(apiService.post, '/note/create', action.payload);
    yield put(createNoteSuccess(response.data));
  } catch (error: any) {
    yield put(createNoteFailure(error.message));
  }
}

function* editNote(action: PayloadAction<{ id: string; updatedNote: INote }>): Generator<any, void, any> {
  try {
    const { id, updatedNote } = action.payload;
    const response = yield call(apiService.put, `/note/update/${id}`, updatedNote);
    yield put(editNoteSuccess({ id, updatedNote: response.data }));
  } catch (error: any) {
    yield put(editNoteFailure(error.message));
  }
}

function* deleteNote(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(apiService.delete, `/note/delete/${id}`);
    yield put(deleteNoteSuccess(id));
  } catch (error: any) {
    yield put(deleteNoteFailure(error.message));
  }
}

// Watcher sagas
function* watchGetNoteList(): Generator<any, void, any> {
  yield takeLatest(getNoteListRequest.type, getNoteList);
}

function* watchCreateNote(): Generator<any, void, any> {
  yield takeLatest(createNoteRequest.type, createNote);
}

function* watchEditNote(): Generator<any, void, any> {
  yield takeLatest(editNoteRequest.type, editNote);
}

function* watchDeleteNote(): Generator<any, void, any> {
  yield takeLatest(deleteNoteRequest.type, deleteNote);
}

export { watchGetNoteList, watchCreateNote, watchEditNote, watchDeleteNote };
