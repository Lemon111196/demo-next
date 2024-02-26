import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
function createNoteSaga(action: any) {
    try {
        const { data } = yield call(api.createNote, action.payload); // Replace with your API call
        yield put(createNoteSuccess(data));
    } catch (error) {
        yield put(createNoteFailure(error.message));
    }
}

function* watchCreateNote() {
    yield takeLatest(createNoteRequest.type, createNoteSaga);
}

export default watchCreateNote;