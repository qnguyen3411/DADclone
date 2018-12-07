import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas';


import appReducer from './reducers/AppReducer';
import submissionReducer from './reducers/SubmissionReducer';
import userReducer from './reducers/UserReducer';

const rootReducer = combineReducers({
  app: appReducer,
  submission: submissionReducer,
  user: userReducer
})
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, {}, compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
sagaMiddleware.run(rootSaga)


export default store;