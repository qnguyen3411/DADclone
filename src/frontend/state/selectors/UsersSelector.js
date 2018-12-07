import { createSelector } from 'reselect';

import transform from 'lodash/transform';
import uniq from 'lodash/uniq';

export const userIsLoggedIn = (state) => !!state.user.currentUserId

export const getUnfetchedPosters = ({ user }, submissions) => {
  const unfetchedPosterIds = Object.values(submissions)
    .map(sub => sub.posterId)
    .filter(posterId => !user.users[posterId]);
  return uniq(unfetchedPosterIds);
}

export const posterForSubmission = ({ user }, submission) => {
  return submission ? user.users[submission.posterId] : null;
}

const getUsers = (state) => state.user.users;

const getEliminatedList = (state) => state.user.eliminated;

const generateScoremap = createSelector(
  [getUsers],
  users => {
    return transform(users, (scoremap, user) =>
      (scoremap[user.streak] || (scoremap[user.streak] = [])).push(user)
      , {})
  }
)

export const getLeaderboard = createSelector(
  [generateScoremap],
  scoreMap => {
    return Object.keys(scoreMap)
      .sort((a, b) => a > b ? -1 : 1)
      .map(streak => ({
        score: streak,
        users: scoreMap[streak]
      }))
  }
)

export const getEliminatedUsers = createSelector(
  [getUsers, getEliminatedList],
  (users, eliminated) => eliminated.map(id => users[id])
)





