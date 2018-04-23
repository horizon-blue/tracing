import actions from '../../actions';

export default (state = null, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};
