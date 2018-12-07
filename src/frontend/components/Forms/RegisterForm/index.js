import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { updateCurrUser } from '../../../actions/UserActions';
import * as Yup from 'yup';
import api from '../../../api';

import FormDisplay from './FormDisplay';

// TODO: reuse yup shema serverside
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Name is too long.')
    .required('Username required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters'),

})

const formLevelValidate = (values) => {
  const errors = {};
  if (values.password && values.password !== values.confirm) {
    errors.confirm = "Password confirm doesn't match";
  }
  return errors;
}

export const RegisterForm = ({ onRegisterSuccess, onClose }) => (
  <Formik
    initialValues={{
      email: '',
      username: '',
      password: '',
      confirm: '',
    }}
    validate={formLevelValidate}
    validationSchema={registerSchema}
    validateOnChange={false}
    onSubmit={(values, actions) => {
      api.user.registerUser(values)
        .then(user => {
          actions.setSubmitting(false);
          onRegisterSuccess(user);
          onClose();
        })
        .catch(errors => {
          actions.setSubmitting(false);
          actions.setErrors(errors)
        })
    }}
    render={FormDisplay}
  />
)

const mapDispatchToProps = (dispatch) => ({
  onRegisterSuccess: (user) => dispatch(updateCurrUser(user))
})

export default connect(null, mapDispatchToProps)(RegisterForm);