import React from 'react';
import { Field, Form } from 'formik';

export default ({ errors, isSubmitting }) => (
  <Form>
    <label>Email:</label>
    <Field className="form-control" type="email" name="email" />
    {errors.email && <div>{errors.email}</div>}
    <label>Username:</label>
    <Field className="form-control" type="text" name="username" />
    {errors.username && <div>{errors.username}</div>}
    <label>Password:</label>
    <Field className="form-control" type="password" name="password" />
    {errors.password && <div>{errors.password}</div>}
    <label>Password confirm:</label>
    <Field className="form-control" type="password" name="confirm" />
    {errors.confirm && <div>{errors.confirm}</div>}
    <button
      className="btn btn-dark col-12 mt-3"
      type="submit"
      disabled={isSubmitting}>
      Submit
    </button>
  </Form>
)