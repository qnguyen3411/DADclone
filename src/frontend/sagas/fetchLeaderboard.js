import { call, put, takeEvery } from 'redux-saga/effects';
// API
import api from '../api';
// ACTIONS
import { actions } from '../constants/User';
import { receiveUsers, fetchUsersFail } from '../actions/UserActions';

function* fetchLeaderboard() {
  try {
    const users = yield call(api.user.fetchLeaderboard);
    yield put(receiveUsers(users));
  } catch (error) {
    yield put(fetchUsersFail());
  }
}

export default function* watchFetchLeaderboardRequest() {
  yield takeEvery(actions.FETCH_LEADERBOARD_REQUEST, fetchLeaderboard)
}