import en from './en';
import zh from './zh';
import actions from 'actions';

export default (state = en, action) => {
  switch (action.type) {
    case actions.TOGGLE_LOCALE:
      return state.locale() === 'en' ? zh : en;
    default:
      return state;
  }
};
