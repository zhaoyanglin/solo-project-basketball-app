import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPark() {
    try {
        const response = yield axios.get('/api/admin');
        
        yield put({ type: 'GET_PARK', payload: response.data })
    } catch (error) {
        console.log('error making GET request in admin saga', error);
    }

}

function* postPark(action) {
    try {

        yield axios.post('/api/admin', action.payload);

        yield put({ type: 'FETCH_PARK' })
    } catch (error) {
        console.log('error making POST request in admin saga', error);
    }
}

function* deletePark(action) {
    try {
        yield axios.delete(`/api/admin/${action.payload}`)

        yield put({ type: 'FETCH_PARK' })
    } catch (error) {
        console.log('DELETE error in admin saga', error)
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_PARK', fetchPark);
    yield takeEvery('POST_PARK', postPark);
    yield takeEvery('DELETE_PARK', deletePark)
}
export default adminSaga;