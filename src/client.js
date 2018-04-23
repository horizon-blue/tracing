import ApolloClient from 'apollo-boost';
import store from './store';

/**
 * The global apollo client that is used to fetch information
 */
export default new ApolloClient({
  uri: 'http://localhost:2333/',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: store.getState().token,
      },
    });
  },
});
