import { createStore } from 'redux';
import { Map } from 'immutable';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  Map(),
  /* Enable Redux Devtools Chrome Extension */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
