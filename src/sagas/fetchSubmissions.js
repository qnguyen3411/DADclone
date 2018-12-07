import { call, all, put, select, takeEvery } from 'redux-saga/effects';
// API
import api from '../api';
// ACTIONS
import { actions } from '../constants/Submission';
import { receiveSubmissions, fetchSubmissionsFail, addToQueryHistory } from '../actions/SubmissionsActions';
import { receiveUsers, fetchUsersFail } from '../actions/UserActions';
// SELECTORS
import { getUnfetchedPosters } from '../state/selectors/UsersSelector';
import { shouldFetchSubmissions } from '../state/selectors/SubmissionsSelector';

const fetchEntries = (queryType) => function* (action) {
  try {
    const query = { type: queryType, value: action.payload };

    const shouldFetch = yield select(shouldFetchSubmissions, query);
    if (!shouldFetch) { return; }

    const submissions = yield call(api.submissions.fetch, query);

    yield put(receiveSubmissions(submissions));
    yield fetchPostersForSubmissions(submissions);
    yield put(addToQueryHistory({ ...query, data: Object.keys(submissions) }));
  } catch (error) {
    yield put(fetchSubmissionsFail());
  }
}

//TODO: move this to user saga
function* fetchPostersForSubmissions(submissions) {
  try {
    const usersToFetch = yield select(getUnfetchedPosters, submissions);
    if (!usersToFetch) { return; }
    const users = yield all(
      usersToFetch.map(userId => call(api.user.getUserById, userId))
    );
    yield put(receiveUsers(users));
  } catch (error) {
    console.log(error);
    yield put(fetchUsersFail());
  }
}

export default function* watchFetchSubmissionRequest() {
  yield all([
    yield takeEvery(actions.FETCH_BY_DATE_REQUESTED, fetchEntries('date')),
    yield takeEvery(actions.FETCH_BY_USER_REQUESTED, fetchEntries('user'))
  ])
}