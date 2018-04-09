import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Home, Nav, Blog, About } from './views';

/**
 * The main App component. Nav and Header are shared across all pages,
 * each Route may optionally contains other sub-routes.
 *
 * @class      App (name)
 */
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
