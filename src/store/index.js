import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';

export default createStore(rootReducer, initialState);
