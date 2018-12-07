import React from 'react';
// import { Link } from 'react-router-dom';
import {GalleryLink} from '../GalleryLink';

export default ({ users }) => {
  return (
    users.map((user, index) => (
      <GalleryLink user={user}>
        <img
          key={index}
          width={30}
          height={30}
          className="rounded-circle m-1"
          src={user.avi}
          alt={user.username} />
      </GalleryLink>
    ))
  )
}