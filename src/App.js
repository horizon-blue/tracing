import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Home } from './views';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
