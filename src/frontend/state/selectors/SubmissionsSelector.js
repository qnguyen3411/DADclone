import { pipe, paginateItems, needsRefetch } from '../../helpers';
import { createSelector } from 'reselect'
import get from 'lodash/get';

const getDateQueryData = (state, date) =>
  get(state, ['submission', 'queryHistory', 'date', date, 'data'], []);

const getUserQueryData = (state, id) =>
  get(state, ['submission', 'queryHistory', 'user', id, 'data'], []);

const getPagination = (state) => state.submission.pagination;

const getSubmissions = (state) => state.submission.items;

export const getSubmissionById = (state, id) => state.submission.items[id];

const getItemsByDate = createSelector(
  [getDateQueryData, getSubmissions],
  (data, submissions) => data.map(id => submissions[id])
)

const getItemsByUser = createSelector(
  [getUserQueryData, getSubmissions],
  (data, submissions) => data.map(id => submissions[id])
)

const createSortedPaginatedSelector = (itemsSelector) =>
  createSelector(
    [itemsSelector, getPagination],
    (items, pagination) => {
      return pipe(
        items => items.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1),
        items => paginateItems(items, pagination)
      )(items)
    }
  )

export const getPaginatedSubmissionsByDate = createSortedPaginatedSelector(getItemsByDate);

export const getPaginatedSubmissionsByUser = createSortedPaginatedSelector(getItemsByUser);


export const getCurrPage = ({ submission: { pagination } }) => {
  return pagination.offset + 1;
}

export const getLimit = createSelector(
  [getPagination],
  (pagination) => pagination.limit
)

export const getPageNum = createSelector(
  [getSubmissions, getLimit],
  (submissions, limit) => Math.ceil(Object.values(submissions).length / limit)
);

export const shouldFetchSubmissions = ({ submission: { queryHistory } }, query) => {
  const entry = queryHistory[query.type][query.value];
  if (!entry) { return true; }
  return needsRefetch(entry.fetchedAt);
} 