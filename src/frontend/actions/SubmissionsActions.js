import { actions } from '../constants/Submission';

// TODO: change this to more specific action
export const setPage = (pageNum) => ({
  type: actions.SET_SUBMISSIONS_QUERY,
  payload: { offset: pageNum - 1 }
})

export const setLimit = (limit) => ({
  type: actions.SET_SUBMISSIONS_PER_PAGE,
  payload: limit
})

export const addSubmission  = submission => ({
  type: actions.ADD_NEW_SUBMISSION,
  payload: submission
})

export const receiveSubmissions = (submissions) => ({
  type: actions.FETCH_SUBMISSIONS_LIST_SUCCESS,
  payload: submissions
})

export const fetchSubmissionsFail = () => ({
  type: actions.FETCH_SUBMISSIONS_LIST_FAIL
})

export const fetchUserSubmissions = (userId) => ({
  type: actions.FETCH_BY_USER_REQUESTED,
  payload: userId
})

export const fetchSubmissionsByDate = (date) => ({
  type: actions.FETCH_BY_DATE_REQUESTED,
  payload: date
})

export const addToQueryHistory = (data) => ({
  type: actions.ADD_TO_QUERY_HISTORY,
  payload: {
    ...data,
    fetchedAt: new Date().getTime()
  }
})

