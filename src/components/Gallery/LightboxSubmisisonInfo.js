import React from 'react';

export default ({ user, postedDate, onClick }) => (
  <div className="d-flex" onClick={onClick}>
    <img className="rounded-circle avi m-1" src={user.avi} alt="avi" />
    <span className="font-weight-bold text-light">{user.username} - on {postedDate}</span>
  </div>
)
