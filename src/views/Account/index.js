import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountHome from './AccountHome';
import Editor from './Editor';
import './index.less';

/**
 * The Account Section.
 *
 * @class      Account (name)
 */
class Account extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/account" component={AccountHome} />
        <Route path="/account/editor" component={Editor} />
      </Switch>
    );
  }
}

export default Account;
