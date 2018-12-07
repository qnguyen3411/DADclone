import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { xor } from '../helpers';

export const GalleryLink = ({ date, userId, children }) => {
  if (!xor(date === undefined, userId === undefined)) return;
  const to = `/gallery/${date ? date : 'user/' + userId}`
  return <Link to={to}>{children}</Link>
}

export const GalleryRedirect = ({ date, userId, children }) => {
  if (!xor(date === undefined, userId === undefined)) return;
  const to = `/gallery/${date ? date : 'user/' + userId}`
  return <Redirect to={to}>{children}</Redirect>
}