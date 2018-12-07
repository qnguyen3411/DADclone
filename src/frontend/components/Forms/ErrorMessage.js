import React from 'react';
import { ErrorMessage } from 'formik';

export default ({ name }) =>
  <ErrorMessage
    name={name}
    render={msg => 
      <p className="mb-0 font-weight-bold text-danger">{msg}</p>
    }
  />