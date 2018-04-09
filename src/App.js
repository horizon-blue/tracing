import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Home, Nav, Blog } from './views';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </div>
    );
  }
}

export default App;
