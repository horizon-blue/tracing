import { combineReducers } from 'redux-immutable';
import locale from './locale';
import token from './token';

export default combineReducers({ locale, token });
