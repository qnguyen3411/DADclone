import { call, put, takeEvery } from 'redux-saga/effects';
// API
import api from '../api';
// ACTIONS
import { actions } from '../constants/User';
import { receiveEliminated, fetchEliminatedFail } from '../actions/UserActions';

function* fetchEliminated() {
  try {
    const users = yield call(api.user.fetchEliminated);
    yield put(receiveEliminated(users));
  } catch (error) {
    yield put(fetchEliminatedFail());
  }
}

export default function* watchFetchEliminatedRequest() {
  yield takeEvery(actions.FETCH_ELIMINATED_REQUEST, fetchEliminated)
}