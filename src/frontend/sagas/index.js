import { all } from 'redux-saga/effects';

import watchFetchSubmissionRequests from './fetchSubmissions';
import watchFetchLeaderboardRequests from './fetchLeaderboard';
import watchFetchEliminatedRequests from './fetchEliminated';

export default function* rootSaga() {
  yield all([
    watchFetchSubmissionRequests(),
    watchFetchEliminatedRequests(),
    watchFetchLeaderboardRequests()
  ])
}