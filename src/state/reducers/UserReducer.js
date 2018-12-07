import { actions } from '../../constants/User';

const initialState = {
  eliminated: [],
  currentUserId: 1,
  users: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_USER_IN:
      return handleUserLogin(state, action);
    case actions.FETCH_USERS_SUCCESS:
      return handleFetchUsersSuccess(state, action);
    case actions.FETCH_ELIMINATED_SUCCESS:
      return handleFetchEliminatedSuccess(state, action);
    default: return state;
  }
}
// TODO: append user to array if not there already
function handleUserLogin(state, { payload }) {
  return {
    ...state,
    users: { ...state.users, [payload.id]: payload },
    currentUserId: payload.id
  };
}

function handleFetchUsersSuccess(state, { payload }) {
  return { ...state, users: { ...state.users, ...payload } };
}

function handleFetchEliminatedSuccess(state, { payload }) {
  return {
    ...state,
    users: { ...state.users, ...payload },
    eliminated: Object.keys(payload)
  }
}