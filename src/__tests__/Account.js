import React from 'react';
import { AccountHomeView } from '../views/Account/AccountHome';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from '../store';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={{}}>
        <BrowserRouter>
          <AccountHomeView data={{ loading: true }} />
        </BrowserRouter>
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
