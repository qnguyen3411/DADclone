import { actions } from '../../constants/App';

const initialState = {
  showingModal: false,
  modalComponent: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL: 
      return handleShowModal(state, action);
    case actions.HIDE_MODAL:
      return handleHideModal(state, action);
    case actions.SET_LOADING:
      return handleSetLoading(state, action);
    default: return state;
  }
}

function handleShowModal(state, action) {
  return {
    ...state, 
    showingModal: true, 
    modalComponent: action.payload
  }
}

function handleHideModal(state, action) {
  return {
    ...state, 
    showingModal: false, 
    modalComponent: null
  }
}

function handleSetLoading(state, action) {
  return {
    ...state,
    isLoading: action.payload
  }
}