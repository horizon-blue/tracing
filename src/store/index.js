import { createStore } from 'redux';
import initialState from './initialState';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  initialState,
  /* Enable Redux Devtools Chrome Extension */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
