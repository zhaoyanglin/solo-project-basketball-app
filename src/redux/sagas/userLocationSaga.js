import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserLocation(action) {
    try {
        console.log('fetchUserLocation action:', action);
        
        const response = yield axios.get(`/api/userLocation/${action.payload}`);

        console.log('response.data if:', response.data);
        

        yield put({ type: 'GET_USER_LOCATION', payload: response.data })
    } catch (error) {
        console.log('error making GET request in user location saga', error);
    }

}

function* updateUserLoaction(action) {
    try {
        
        yield axios.put('/api/userLocation', action.payload);

        yield put({ type: 'FETCH_PLAYERS_AROUND_PARK' })
    } catch (error) {
        console.log('error making POST request in user location saga', error);
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_PLAYERS_AROUND_PARK', fetchUserLocation);
    yield takeEvery('UPDATE_USER_LOCATION', updateUserLoaction);
}
export default adminSaga;