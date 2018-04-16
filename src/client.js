import ApolloClient from 'apollo-boost';

/**
 * The global apollo client that is used to fetch information
 */
export default new ApolloClient({
  uri: 'http://localhost:2333/graphql',
});
