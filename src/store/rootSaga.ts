import { all } from 'redux-saga/effects';
import watchCreateNote from './noteStore/noteSaga';

function* rootSaga() {
    yield all([
        watchCreateNote(),
        // Add other sagas here if needed
    ]);
}

export default rootSaga;