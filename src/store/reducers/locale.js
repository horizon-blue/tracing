import actions from '../../actions';

export default (state = 'en', action) => {
  switch (action.type) {
    case actions.TOGGLE_LOCALE:
      return state === 'en' ? 'zh' : 'en';
    default:
      return state;
  }
};
