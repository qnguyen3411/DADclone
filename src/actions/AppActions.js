import { actions } from '../constants/App';
import { modalComponent } from '../constants/App';

export const setLoading = (val) => ({
  type: actions.SET_LOADING,
  payload: val
})

export const showLoginForm = () => 
  showModal(modalComponent.LOGIN_FORM);

export const showRegisterForm = () => 
  showModal(modalComponent.REGISTER_FORM);

export const showSubmissionForm = () => 
  showModal(modalComponent.SUBMISSION_FORM);

export const showModal = (component) => ({
  type: actions.SHOW_MODAL,
  payload: component
})

export const hideModal = () => ({
  type: actions.HIDE_MODAL
})