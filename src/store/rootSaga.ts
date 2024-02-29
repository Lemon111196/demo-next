import { all } from 'redux-saga/effects';
import { watchCreateNote, watchGetNoteList, watchEditNote, watchDeleteNote } from './noteStore/noteSaga';

function* rootSaga() {
    yield all([
        watchCreateNote(),
        watchGetNoteList(),
        watchEditNote(),
        watchDeleteNote(),
    ]);
}

export default rootSaga;