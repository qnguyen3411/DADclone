import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import api from '../../api';
import { updateCurrUser } from '../../actions/UserActions';


export const LoginForm = ({ onLoginSuccess, onClose }) => (
  <Formik
    initialValues={{
      username: '',
      password: ''
    }}
    onSubmit={(values, actions) => {
      api.logUserIn(values)
      .then(user => {
        actions.setSubmitting(false);
        onLoginSuccess(user);
        onClose();
      })
      .catch(errors => {
        actions.setSubmitting(false);
        actions.setErrors(errors)
      }) 
    }
    }
    render={({ errors, isSubmitting }) => (
      <Form>
        <Field type="text" name="username" />
        <Field type="password" name="password" />
        {errors.login && <div>{errors.login}</div>}
        <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  />
)

const mapDispatchToProps = (dispatch) => ({
  onLoginSuccess: (user) => dispatch(updateCurrUser(user))
})

export default connect(null, mapDispatchToProps)(LoginForm);