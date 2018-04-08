import initialState from './initialState';

export default (state = initialState.get('test'), action) => {
    return state;
};
