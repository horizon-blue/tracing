import { combineReducers } from 'redux';
import locale from './locale';
import token from './token';

export default combineReducers({ locale, token });
