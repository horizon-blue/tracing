import actions from '../../actions';
import initialState from '../initialState';

export default (state = initialState.token, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return action.token;
    case actions.REMOVE_TOKEN:
      return null;
    default:
      return state;
  }
};
