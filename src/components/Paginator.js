import React from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import times from 'lodash/times';

import { getPageNum, getCurrPage } from '../state/selectors/SubmissionsSelector';
import { setPage } from '../actions/SubmissionsActions';

export const Paginator = ({ pageNum, currPage, setPage }) => {

  const activeClass = "text-light bg-dark border border-dark";
  const nonActiveClass = "text-dark border border-dark";
  const resolveClass = index => 
    (index + 1 === currPage) ? activeClass : nonActiveClass;
    
  const prevButton = currPage !== 1 && (
    <PaginationItem>
      <PaginationLink previous
        onClick={setPage(currPage - 1)}
        className={nonActiveClass} />
    </PaginationItem>
  )

  const nextButton = currPage !== pageNum && (
    <PaginationItem>
      <PaginationLink next 
        onClick={setPage(currPage + 1)}
        className={nonActiveClass} />
    </PaginationItem>
  )

  return (
    <Pagination>
      {prevButton}
      {times(pageNum, index => (
        <PaginationItem key={index}>
          <PaginationLink
            onClick={setPage(index + 1)}
            className={resolveClass(index)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      {nextButton}
    </Pagination>
  )
}

const mapStateToProps = (state) => ({
  pageNum: getPageNum(state),
  currPage: getCurrPage(state)
})

const mapDispatchToProps = (dispatch) => ({
  setPage: (pageNum) => () => dispatch(setPage(pageNum))
})

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);

