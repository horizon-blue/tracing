import actions from '../../actions';
import initialState from '../initialState';

export default (state = initialState.locale, action) => {
  switch (action.type) {
    case actions.TOGGLE_LOCALE:
      return state === 'en' ? 'zh-cn' : 'en';
    default:
      return state;
  }
};
