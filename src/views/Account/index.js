import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountHome from './AccountHome';
import Editor from './Editor';
import EditAccount from './EditAccount';
// import PostStats from './PostStats';
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
        <Route exact path="/account/edit" component={EditAccount} />
        <Route exact path="/account/posts/editor" component={Editor} />
        <Route path="/account/posts/editor/:postId" component={Editor} />
      </Switch>
    );
  }
}

export default Account;
