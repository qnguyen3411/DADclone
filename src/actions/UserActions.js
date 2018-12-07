import { actions } from '../constants/User';
import { setLoading } from './AppActions';
import { arrayToIdObject } from '../helpers';

export const updateCurrUser = (user) => ({
  type: actions.LOG_USER_IN,
  payload: user
})

export const logUserIn = (data, onSuccess, onFail) => (dispatch, getState, api) => {
  dispatch(setLoading(true))
  api.user.logUserIn(data)
    .then(user => {
      dispatch(updateCurrUser(user))
      dispatch(setLoading(false))
      onSuccess(user);
    })
    .catch(errors => {
      dispatch(setLoading(false))
      onFail(errors);
    })
}

export const registerUser = (data, onSuccess, onFail) => (dispatch, getState, api) => {
  dispatch(setLoading(true));
  api.user.registerUser(data)
    .then(user => {
      dispatch(updateCurrUser(user));
      dispatch(setLoading(false));
      onSuccess(user);
    })
    .catch(errors => {
      dispatch(setLoading(false));
      onFail(errors);
    })
}

export const fetchLeaderboardRequest = () => ({ 
  type: actions.FETCH_LEADERBOARD_REQUEST 
});

export const receiveUsers = (users) => {
  const payload = Array.isArray(users) ? arrayToIdObject(users) : users;
  return ({
    type: actions.FETCH_USERS_SUCCESS,
    payload
  })
}

export const fetchUsersFail = () => ({ type: actions.FETCH_USERS_FAIL })

export const fetchEliminatedTodayRequest = () => ({
  type: actions.FETCH_ELIMINATED_REQUEST
});

export const receiveEliminated = (users) => ({
  type: actions.FETCH_ELIMINATED_SUCCESS,
  payload: users
})

export const fetchEliminatedFail = () => ({
  type: actions.FETCH_ELIMINATED_FAIL
})