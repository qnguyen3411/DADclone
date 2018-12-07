import { actions, query } from '../../constants/Submission';

const initialState = {
  pagination: query.LIST_DEFAULT,
  queryHistory: {
    date: {},
    user: {}
  },
  items: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_NEW_SUBMISSION:
      return handleAddNewSubmission(state, action);
    // case actions.FETCH_SUBMISSIONS_LIST_FAIL:
    case actions.FETCH_SUBMISSIONS_LIST_SUCCESS:
      return handleFetchSubmissionsSuccess(state, action);
    case actions.SET_CURRENT_PAGE:
      return handleSetCurrentPage(state, action);
    case actions.SET_SUBMISSIONS_PER_PAGE:
      return handleSetSubmissionsPerPage(state, action);
    case actions.ADD_TO_QUERY_HISTORY:
      return handleAddToQueryHistory(state, action);
    default: return state;
  }
}

function handleFetchSubmissionsSuccess(state, action) {
  return {
    ...state,
    items: {...state.items, ...action.payload},
    pagination: { ...state.pagination, offset: 0 }
  }
}

function handleSetCurrentPage(state, action) {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      offset: Math.max(0, action.payload - 1)
    }
  }
}

function handleSetSubmissionsPerPage(state, action) {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      limit: action.payload
    }
  }
}

function handleAddToQueryHistory(state, action) {
  const { type, value, data, fetchedAt } = action.payload;
  const queryHistory = {
    ...state.queryHistory,
    [type]: {
      ...state.queryHistory[type],
      [value]: { data, fetchedAt }
    }
  }
  return {
    ...state,
    queryHistory
  }
}

function handleAddNewSubmission(state, action) {
  const submission = action.payload;
  const items = { ...state.items, [submission.id]: submission };
  const queryHistory = addSubmissionToQueryHistoryData(state.queryHistory, submission);

  return {
    ...state,
    items,
    queryHistory
  }
}

function addSubmissionToQueryHistoryData(queryHistory, submission) {
  let date = queryHistory.date;
  let user = queryHistory.user;
  const existingDateEntry = queryHistory.date[submission.createdAt];
  const existingUserEntry = queryHistory.user[submission.id];
  if(existingDateEntry) {
    date = {
      ...date,
      [submission.createdAt]: entryWithNewItem(existingDateEntry, submission.id)
    }
  }

  if(existingUserEntry) {
    user = {
      ...user,
      [submission.posterId]: entryWithNewItem(existingUserEntry, submission.id)
    }
  }
  return {...queryHistory, date, user}
}

function entryWithNewItem(entry, newItem) {
  return {
    ...entry,
    data: entry.data.concat(newItem)
  }
}