import React from 'react';
import { Form, Field } from 'formik';
import { FormText } from 'reactstrap';

import { fileValidator } from './validators';

import Dropzone from './Dropzone';
import ErrorMessage from '../ErrorMessage';

export default () => (
  <Form>
    <Dropzone name="file" validate={fileValidator} />
    <FormText color="muted"> Accepted: .jpeg, .png (Max 2.5MB)</FormText>
    <ErrorMessage name="file" />

    <label className="mt-2">Title (optional):</label>
    <Field className="form-control" name="title" />
    <ErrorMessage name="title" />

    <label>Description (optional):</label>
    <Field className="form-control" name="description" />
    <ErrorMessage name="description" />

    <button
      className="btn btn-dark col-12 mt-3"
      type="submit">
      Submit
    </button>
  </Form>
)