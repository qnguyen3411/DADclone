import React from 'react';
import { connect } from 'react-redux';
import { Formik } from "formik";

import { addSubmission as postToServer } from '../../../api/Submissions';

import { addSubmission } from '../../../actions/SubmissionsActions';

import validators from './validators';
import FormDisplay from './FormDisplay';

export const SubmissionForm = ({ onClose, onAddSuccess }) => (
  <Formik
    validate={validators}
    validateOnChange={false}
    initialValues={{
      file: undefined,
      title: '',
      description: ''
    }}
    onSubmit={(values, actions) => {
      actions.setSubmitting(true);
      postToServer(values)
        .then(newSubmission => {
          actions.setSubmitting(false);
          onAddSuccess(newSubmission);
          onClose();
        })
        .catch(err => {
          actions.setSubmitting(false);
          actions.setErrors(err);
        })
    }}
    render={FormDisplay}
  />
)

const mapDispatchToProps = (dispatch) => ({
  onAddSuccess: newSubmission => dispatch(addSubmission(newSubmission))
})

export default connect(null, mapDispatchToProps)(SubmissionForm);


