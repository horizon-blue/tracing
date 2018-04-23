import React from 'react';
import Login from '../views/Login';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from '../store';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={{}}>
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
