import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {  Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { getNextDateStr, getPrevDateStr} from '../../helpers';

const DateControl = ({ date, onDateChange }) => {
  const prevDate = getPrevDateStr(date);
  const nextDate = getNextDateStr(date);
  const yesterdayGallery = `/gallery/${prevDate}`;
  const tomorrowGallery =  `/gallery/${nextDate}`;
  const linkClassName = 'text-dark border border-dark';
  return (
    <Pagination className="mr-3">
      <PaginationItem>
        <PaginationLink 
          previous 
          tag={RouterNavLink} 
          to={yesterdayGallery}
          onClick={onDateChange(prevDate)}
          className={linkClassName} /> 
      </PaginationItem>
      <PaginationItem className="pt-1 px-2 text-dark lead">
        {date}
      </PaginationItem>
      <PaginationItem>
        <PaginationLink 
          next 
          tag={RouterNavLink} 
          to={tomorrowGallery}
          onClick={onDateChange(nextDate)}
          className={linkClassName}  />
      </PaginationItem>
    </Pagination>
  )
}


export default DateControl;