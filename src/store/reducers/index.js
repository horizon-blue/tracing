import { combineReducers } from 'redux-immutable';
import test from './test';

export { default as initialState } from './initialState';
export default combineReducers({ test });
