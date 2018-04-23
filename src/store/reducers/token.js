import actions from '../../actions';
import initialState from '../initialState';

export default (state = initialState.token, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};
