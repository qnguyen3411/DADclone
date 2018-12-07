import moment from 'moment';
import { DATE_FORMAT, REFETCH_TIME } from '../constants/App';


export const getTodaysDateStr = () => moment().format(DATE_FORMAT);

export const needsRefetch = (lastFetched) => {
  const refetchTime = moment(lastFetched).add(REFETCH_TIME);
  return moment().isAfter(refetchTime);
}

export const arrayToIdObject = (arr) => {
  return arr.reduce((obj, item) => ({...obj, [item.id]: item}), {} )
}

export const paginateItems = (items, {offset, limit}) => {
  return items.slice(offset * limit, offset * limit + limit);
}

export const pipe = (...ops) => ops.reduce((a, b) => (arg) => b(a(arg)))