import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export const GalleryLink = ({ userId, user, children }) => {
  const to = `/gallery/user/${userId ? userId : user.id}`
  return <Link to={to}>{children}</Link>
}

export const GalleryRedirect = ({ userId, user, children }) => {
  const to = `/gallery/user/${userId ? userId : user.id}`
  return <Redirect to={to}>{children}</Redirect>
}