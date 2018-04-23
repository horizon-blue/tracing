import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { Header, Home, Nav, Blog, About, Login, Loading } from './views';

import client from './client';
import store, { persistor } from './store';

/**
 * The main App component. Nav and Header are shared across all pages,
 * each Route may optionally contains other sub-routes.
 *
 * @class      App (name)
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <div>
                <Header />
                <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/about" component={About} />
                  <Route path="/login" component={Login} />
                </Switch>
              </div>
            </BrowserRouter>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
